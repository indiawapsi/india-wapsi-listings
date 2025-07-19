import { clerkMiddleware } from '@clerk/nextjs/server';

export default clerkMiddleware({
  publicRoutes: [
    '/',
    '/browse',
    '/about',
    '/contact',
    '/ads/(.*)',
    '/sign-in(.*)',
    '/sign-up(.*)'
  ]
});

export const config = {
  matcher: ['/((?!.*\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};
