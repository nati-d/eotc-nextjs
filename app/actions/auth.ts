'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export async function login(email: string, password: string) {
    try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL
        if (!apiUrl) {
            throw new Error('API URL is not configured. Please set NEXT_PUBLIC_API_URL in your environment variables.')
        }

        const response = await fetch(`${apiUrl}/auth/login`, {
            method: 'POST',
            body: JSON.stringify({ email, password }),
            headers: { 'Content-Type': 'application/json' },
        })

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}))
            throw new Error(errorData.message || 'Invalid credentials')
        }

        const data = await response.json()

        if (!data.access_token || !data.refresh_token) {
            throw new Error('Invalid response from server')
        }

        // Store tokens in cookies
        const cookiesStore = await cookies()
        cookiesStore.set('access_token', data.access_token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: data.access_token_expires_in || 3600, // Default to 1 hour if not provided
            sameSite: 'lax',
            path: '/',
        })
        cookiesStore.set('refresh_token', data.refresh_token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: data.refresh_token_expires_in || 604800, // Default to 7 days if not provided
            sameSite: 'lax',
            path: '/',
        })

        redirect('/')
    } catch (error) {
        if (error instanceof Error) {
            throw error
        }
        throw new Error('An unexpected error occurred during login')
    }
}

export async function register(
    email: string,
    password: string,
    first_name: string,
    last_name: string
) {
    try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL
        if (!apiUrl) {
            throw new Error('API URL is not configured. Please set NEXT_PUBLIC_API_URL in your environment variables.')
        }

        const response = await fetch(`${apiUrl}/auth/register`, {
            method: 'POST',
            body: JSON.stringify({ email, password, first_name, last_name }),
            headers: { 'Content-Type': 'application/json' },
        })

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}))
            throw new Error(errorData.message || 'Registration failed')
        }

        const data = await response.json()

        if (!data.access_token || !data.refresh_token) {
            throw new Error('Invalid response from server')
        }

        // Store tokens in cookies
        const cookiesStore = await cookies()
        cookiesStore.set('access_token', data.access_token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: data.access_token_expires_in || 3600,
            sameSite: 'lax',
            path: '/',
        })
        cookiesStore.set('refresh_token', data.refresh_token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: data.refresh_token_expires_in || 604800,
            sameSite: 'lax',
            path: '/',
        })

        redirect('/')
    } catch (error) {
        if (error instanceof Error) {
            throw error
        }
        throw new Error('An unexpected error occurred during registration')
    }
}

export async function isAuthenticated() {
    try {
        const cookiesStore = await cookies()
        const accessToken = cookiesStore.get('access_token')?.value
        return !!accessToken
    } catch (error) {
        console.error(error)
        return false
    }
}

export async function logout() {
    try {
        const cookiesStore = await cookies()
        // Delete cookies (path is automatically handled by Next.js)
        cookiesStore.delete('access_token')
        cookiesStore.delete('refresh_token')
        redirect('/auth/login')
    } catch (error) {
        console.error(error)
        // Even if cookie deletion fails, still redirect to login
        redirect('/auth/login')
    }
}