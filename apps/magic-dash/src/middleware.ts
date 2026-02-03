import { NextResponse, type NextRequest } from "next/server";
import { updateSession } from "./utils/server";

function isSameOrigin(req: NextRequest) {
  const expected = new URL("http://localhost:9000").origin;
  const origin = req.headers.get("origin");
  const referer = req.headers.get("referer");
  const refererOrigin = referer ? new URL(referer).origin : null;
  return origin === expected || refererOrigin === expected;
}

export async function middleware(request: NextRequest) {
  if (!["GET", "HEAD", "OPTIONS"].includes(request.method)) {
    if (!isSameOrigin(request)) {
      // allowlist known external webhook paths *before* this check if needed
      return new NextResponse("Forbidden (CSRF)", { status: 403 });
    }
  }

  return await updateSession(request);
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
