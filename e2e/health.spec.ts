import { expect, test } from "@playwright/test";

test("GET /api/health returns status 200", async ({ request }) => {
  const response = await request.get("/api/health");

  expect(response.status()).toBe(200);
});

test('GET /api/health returns the JSON body {"status":"ok"}', async ({ request }) => {
  const response = await request.get("/api/health");

  expect(await response.json()).toEqual({ status: "ok" });
});

test("GET /api/health returns the header Cache-Control: no-store", async ({ request }) => {
  const response = await request.get("/api/health");

  expect(response.headers()["cache-control"]).toBe("no-store");
});
