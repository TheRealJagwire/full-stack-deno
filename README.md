# full-stack-deno

A bare full-stack seed: Deno (strict TypeScript), [Hono](https://hono.dev) on the server,
[Preact](https://preactjs.com) + [Tailwind CSS](https://tailwindcss.com) in the browser, and
[Zuke](https://jsr.io/@zuke/core) for the build.

```sh
deno task build   # Tailwind + client bundle into static/
deno task start   # http://localhost:8000
deno task dev     # watch CSS, client and server
deno task ci      # fmt, lint, typecheck, test, build
deno task zuke --list
```

```
src/server/   Hono app (app.ts) and entrypoint (main.ts)
src/client/   Preact app and Tailwind entry
static/       built assets (git-ignored)
tests/        Deno tests
zuke.ts       build targets
```
