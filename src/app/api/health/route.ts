// Health check for uptime monitors. Takes no input and cannot fail: it always
// answers 200 with {"status":"ok"} and must never be cached.
export const dynamic = "force-dynamic";

export async function GET() {
  return Response.json(
    { status: "ok" },
    { headers: { "Cache-Control": "no-store" } },
  );
}
