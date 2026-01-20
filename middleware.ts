import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isProtectedRoute = createRouteMatcher([
    '/dashboard(.*)',
    '/models(.*)',
    '/bookings(.*)',
    '/documents(.*)',
    '/settings(.*)',
    // '/' is now public
]);

// Allow public access to sign-in, sign-up, and home
const isPublicRoute = createRouteMatcher([
    '/sign-in(.*)',
    '/sign-up(.*)',
    '/'
]);

export default clerkMiddleware(async (auth, req) => {
    const { userId } = await auth();

    // If user is logged in and tries to access the landing page (root), redirect to dashboard
    if (userId && req.nextUrl.pathname === '/') {
        return Response.redirect(new URL('/dashboard', req.url));
    }

    if (isProtectedRoute(req)) await auth.protect();
});

export const config = {
    matcher: [
        // Skip Next.js internals and all static files, unless found in search params
        '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
        // Always run for API routes
        '/(api|trpc)(.*)',
    ],
};
