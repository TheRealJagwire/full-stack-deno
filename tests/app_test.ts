import { assertEquals } from "@std/assert";
import { createApp } from "../src/server/app.ts";

Deno.test("GET /api/hello returns a greeting", async () => {
  const res = await createApp().request("/api/hello");
  assertEquals(res.status, 200);
  assertEquals(await res.json(), { message: "Hello from Hono" });
});
