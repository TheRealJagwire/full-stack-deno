import { useEffect, useState } from "preact/hooks";

type Hello = { message: string };

export function App() {
  const [message, setMessage] = useState<string>("…");

  useEffect(() => {
    fetch("/api/hello")
      .then((res) => res.json() as Promise<Hello>)
      .then((data) => setMessage(data.message))
      .catch(() => setMessage("Could not reach the server"));
  }, []);

  return (
    <main class="min-h-screen grid place-items-center bg-slate-950 text-slate-100">
      <div class="text-center space-y-3">
        <h1 class="text-4xl font-semibold">Welcome</h1>
        <p class="text-slate-400">Deno · Hono · Preact · Tailwind · Zuke</p>
        <p class="font-mono text-sm text-emerald-400">{message}</p>
      </div>
    </main>
  );
}
