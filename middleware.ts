import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'
import { getAccessToken } from '@/lib/utils/auth'

export async function middleware(request: NextRequest) {
    const accessToken = await getAccessToken(request)
    const { pathname } = request.nextUrl

    // Skip middleware for static files (images, etc.)
    const isStaticFile = /\.(png|jpg|jpeg|gif|svg|ico|webp|css|js|woff|woff2|ttf|eot)$/i.test(pathname)
    if (isStaticFile) {
        return NextResponse.next()
    }

    const isAuthRoute = pathname.startsWith('/auth')
    const isRootRoute = pathname === '/'
    
    // Define protected routes (routes that require authentication)
    // Exclude auth routes from being protected
    const isProtectedRoute = !isAuthRoute && pathname !== '/'

    // If user is logged in
    if (accessToken) {
        // Redirect from auth routes to home
        if (isAuthRoute) {
            return NextResponse.redirect(new URL('/', request.url))
        }
        // Root route is allowed for logged-in users (or redirect to dashboard if you prefer)
        // For now, we'll allow it
        return NextResponse.next()
    }

    // If user is not logged in
    // Protect routes (except auth routes and root)
    if (isProtectedRoute) {
        const url = new URL('/auth/login', request.url)
        url.searchParams.set('callbackUrl', request.url)
        return NextResponse.redirect(url)
    }

    // Allow access to auth routes and root route for non-logged-in users
    return NextResponse.next()
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * Static files are handled in the middleware function itself
         */
        '/((?!api|_next/static|_next/image|favicon.ico).*)',
    ],
}
