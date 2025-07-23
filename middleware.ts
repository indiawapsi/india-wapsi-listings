// src/middleware.ts

import { clerkMiddleware } from '@clerk/nextjs/server';

export default clerkMiddleware();

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
  publicRoutes: [
    '/',
    '/browse',
    '/about',
    '/contact',
    '/api/webhooks/clerk',
    '/ads/(.*)',
    '/sign-in(.*)',
    '/sign-up(.*)',
  ],
};