import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isProtectedRoute = createRouteMatcher([
  '/dashboard(.*)',
]);

export default clerkMiddleware((auth, req) => {
  const loginUrl = (new URL('/login', req.url)).toString()
  if (isProtectedRoute(req)) auth().protect({ unauthenticatedUrl: loginUrl });
});


export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};