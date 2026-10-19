import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

// Redirects "/" to /tr or /en based on the browser's Accept-Language
// (and remembers a manual choice in a cookie).
export default createMiddleware(routing);

export const config = {
  // Skip API routes, Next internals, files with an extension, and the generated apple-icon.
  matcher: "/((?!api|trpc|_next|_vercel|apple-icon|.*\\..*).*)",
};
