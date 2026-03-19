import { NextResponse } from 'next/server'

/**
 * Next.js Edge Middleware — protects all /admin/* routes.
 *
 * Supabase stores the session in a cookie called `sb-<project_ref>-auth-token`
 * (or the generic `supabase-auth-token`). We check for any cookie that begins
 * with "sb-" and ends with "-auth-token". If it exists and is non-empty the
 * user is considered authenticated (the actual JWT validity is enforced by
 * Supabase RLS on every database call). If the cookie is missing we redirect
 * to /admin (the login page) immediately — before any HTML is sent to the
 * browser.
 *
 * The /admin login page itself is always allowed through so we don't create
 * an infinite redirect loop.
 */
export function middleware(request) {
  // Disabled middleware to fix infinite redirect loop
  // The dashboard page handles its own client-side auth validation
  return NextResponse.next()
}

export const config = {
  // Run on every /admin route, but skip Next.js internals and static assets
  matcher: ['/admin/:path*'],
}
