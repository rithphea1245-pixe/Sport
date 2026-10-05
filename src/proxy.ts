import { NextResponse, type NextRequest } from "next/server";

const API_BASE =
  process.env.NEXT_PUBLIC_API_URL || "https://sport-api.eunglyzhia.com/api/v1";

/**
 * Forwards `/api/v1/*` to the real backend server-side.
 *
 * Why this exists: the backend answers every browser request with
 * `403 Invalid CORS request` because it does not allow this app's origin.
 * A `rewrites()` rule in next.config.ts is not enough on its own -- Next
 * forwards the incoming `Origin` header upstream, so the backend still
 * rejects it. Dropping the browser-only headers here makes the outbound
 * request look like a plain server-to-server call.
 *
 * Because of this, components can just call
 * `fetch("/api/v1/sports")` inside `useEffect` -- no custom proxy route.
 */
export default function proxy(request: NextRequest) {
  const path = request.nextUrl.pathname.replace(/^\/api\/v1/, "");
  const target = new URL(`${API_BASE}${path}${request.nextUrl.search}`);

  const headers = new Headers(request.headers);
  headers.delete("origin");
  headers.delete("referer");
  headers.delete("cookie");
  headers.delete("host");

  return NextResponse.rewrite(target, { request: { headers } });
}

export const config = {
  matcher: "/api/v1/:path*",
};