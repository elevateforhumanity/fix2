// Force fresh responses on every route
export const config = {
  matcher: "/:path*",
};

export function middleware() {
  return new Response(null, {
    headers: {
      "Cache-Control": "no-store, max-age=0, must-revalidate",
    },
  });
}
