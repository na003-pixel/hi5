import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

// Define which routes are protected and require a signed-in user.
const isProtectedRoute = createRouteMatcher([
  '/shop/(.*)/save', // Protects all /save pages under any shop slug
  '/shop/(.*)/review', // Also protect the review page
]);

export default clerkMiddleware((auth, req) => {
  // If the user is trying to access a protected route, enforce authentication.
  if (isProtectedRoute(req)) {
    auth.protect();
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};