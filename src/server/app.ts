import { Hono } from "hono";
import { serveStatic } from "hono/deno";

const page = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Full-stack Deno</title>
    <link rel="stylesheet" href="/static/app.css" />
  </head>
  <body>
    <div id="app"></div>
    <script type="module" src="/static/client.js"></script>
  </body>
</html>`;

export function createApp(): Hono {
  const app = new Hono();

  app.get("/api/hello", (c) => c.json({ message: "Hello from Hono" }));

  app.use("/static/*", serveStatic({ root: "./" }));
  app.get("/", (c) => c.html(page));

  return app;
}
