import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'
import { getAccessToken } from '@/lib/utils/auth'

export async function middleware(request: NextRequest) {
    const accessToken = await getAccessToken(request)
    const { pathname } = request.nextUrl

    const isAuthRoute = pathname.startsWith('/auth')
    const isProtectedRoute = pathname.startsWith('/dashboard')
    const isRootRoute = pathname === '/'

    // If user is logged in
    if (accessToken) {
        // Redirect from auth routes to dashboard
        if (isAuthRoute) {
            return NextResponse.redirect(new URL('/dashboard', request.url))
        }
        // Redirect from root route to dashboard
        if (isRootRoute) {
            return NextResponse.redirect(new URL('/dashboard', request.url))
        }
        // Allow access to dashboard and other routes
        return NextResponse.next()
    }

    // If user is not logged in
    // Protect dashboard routes - redirect to login
    if (isProtectedRoute) {
        const url = new URL('/auth/login', request.url)
        url.searchParams.set('callbackUrl', request.url)
        return NextResponse.redirect(url)
    }

    // Allow access to auth routes and other public routes
    return NextResponse.next()
}

export const config = {
    matcher: [
        '/',
        '/dashboard/:path*',
        '/auth/:path*',
    ],
}
