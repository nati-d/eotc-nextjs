import axios from 'axios'
import { getAccessToken, getRefreshToken } from '@/lib/utils/auth'
import { cookies } from 'next/headers'

const apiUrl = process.env.NEXT_PUBLIC_API_URL
if (!apiUrl) {
    console.error('NEXT_PUBLIC_API_URL is not defined. Please set it in your environment variables.')
}

const api = axios.create({
    baseURL: apiUrl,
    headers: {
        'Content-Type': 'application/json',
    },
})

let isRefreshing = false
let failedQueue: Array<{
    resolve: (value?: any) => void
    reject: (error?: any) => void
}> = []

const processQueue = (error: any, token?: string) => {
    failedQueue.forEach((prom) => {
        if (error) {
            prom.reject(error)
        } else {
            prom.resolve(token)
        }
    })
    failedQueue = []
}

api.interceptors.request.use(async (config) => {
    const accessToken = await getAccessToken()
    if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`
    }
    return config
})

api.interceptors.response.use(
    async (response) => {
        return response
    },
    async (error) => {
        const originalRequest = error.config

        // Check if error.response exists before accessing its properties
        if (!error.response) {
            return Promise.reject(error)
        }

        // Handle 401 Unauthorized errors
        if (error.response.status === 401 && !originalRequest._retry) {
            if (isRefreshing) {
                // If already refreshing, queue this request
                return new Promise((resolve, reject) => {
                    failedQueue.push({ resolve, reject })
                })
                    .then((token) => {
                        originalRequest.headers.Authorization = `Bearer ${token}`
                        return api(originalRequest)
                    })
                    .catch((err) => {
                        return Promise.reject(err)
                    })
            }

            originalRequest._retry = true
            isRefreshing = true

            try {
                const refreshToken = await getRefreshToken()
                if (!refreshToken) {
                    throw new Error('No refresh token available')
                }

                if (!apiUrl) {
                    throw new Error('API URL is not configured')
                }

                const response = await axios.post(
                    `${apiUrl}/auth/refresh`,
                    { refresh_token: refreshToken },
                    {
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    }
                )

                const newAccessToken = response.data.access_token
                const newRefreshToken = response.data.refresh_token // May be undefined if API doesn't rotate refresh tokens

                if (newAccessToken) {
                    // Update cookies with new tokens
                    const cookiesStore = await cookies()
                    cookiesStore.set('access_token', newAccessToken, {
                        httpOnly: true,
                        secure: process.env.NODE_ENV === 'production',
                        maxAge: response.data.access_token_expires_in || 3600,
                        sameSite: 'lax',
                        path: '/',
                    })

                    // Only update refresh token if a new one is provided
                    // Some APIs don't rotate refresh tokens on every refresh
                    if (newRefreshToken) {
                        cookiesStore.set('refresh_token', newRefreshToken, {
                            httpOnly: true,
                            secure: process.env.NODE_ENV === 'production',
                            maxAge: response.data.refresh_token_expires_in || 604800,
                            sameSite: 'lax',
                            path: '/',
                        })
                    }

                    // Process queued requests
                    processQueue(null, newAccessToken)

                    // Update the original request with new token
                    originalRequest.headers.Authorization = `Bearer ${newAccessToken}`
                    isRefreshing = false
                    return api(originalRequest)
                } else {
                    throw new Error('No access token in refresh response')
                }
            } catch (refreshError) {
                isRefreshing = false
                processQueue(refreshError, undefined)

                // Clear tokens on refresh failure
                const cookiesStore = await cookies()
                cookiesStore.delete('access_token')
                cookiesStore.delete('refresh_token')

                return Promise.reject(refreshError)
            }
        }

        return Promise.reject(error)
    }
)

export default api