import { expect, test } from "vitest";

import { GET } from "../route";

test("GET /api/health returns status 200", async () => {
  const response = await GET();

  expect(response.status).toBe(200);
});

test("GET /api/health returns the JSON body {\"status\":\"ok\"}", async () => {
  const response = await GET();

  expect(await response.json()).toEqual({ status: "ok" });
});

test("GET /api/health returns the header Cache-Control: no-store", async () => {
  const response = await GET();

  expect(response.headers.get("cache-control")).toBe("no-store");
});
