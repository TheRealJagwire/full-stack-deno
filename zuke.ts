// The build, driven by Zuke. Run `deno task zuke --list` to see every target.
import { Build, run, target } from "@zuke/core";
import { $ } from "@zuke/core/shell";
import { DenoTasks } from "@zuke/deno";

class AppBuild extends Build {
  clean = target()
    .description("Delete generated assets in static/")
    .executes(async () => {
      for (const file of ["static/app.css", "static/client.js"]) {
        await Deno.remove(file).catch(() => {});
      }
    });

  css = target()
    .description("Build Tailwind CSS into static/app.css")
    .inputs("src/client", "deno.json")
    .outputs("static/app.css")
    .executes(async () => {
      await $`deno run -A npm:@tailwindcss/cli -i src/client/styles/app.css -o static/app.css --minify`;
    });

  bundle = target()
    .description("Bundle the Preact client into static/client.js")
    .inputs("src/client", "deno.json")
    .outputs("static/client.js")
    .executes(async () => {
      await $`deno bundle --platform=browser --minify -o static/client.js src/client/main.tsx`;
    });

  build = target()
    .description("Build everything the server serves from static/")
    .dependsOn(this.css, this.bundle)
    .executes(() => {});

  fmt = target()
    .description("Check formatting")
    .executes(() => DenoTasks.fmt((s) => s.check()));

  lint = target()
    .description("Lint sources")
    .executes(() => DenoTasks.lint());

  typecheck = target()
    .description("Type-check server, client, build and tests")
    .executes(() =>
      DenoTasks.check((s) =>
        s.paths("src/server/main.ts", "src/client/main.tsx", "zuke.ts", "tests/app_test.ts")
      )
    );

  check = target()
    .description("Formatting, lint and type checks")
    .dependsOn(this.fmt, this.lint, this.typecheck)
    .executes(() => {});

  test = target()
    .description("Run the test suite")
    .executes(() => DenoTasks.test((s) => s.allowAll()));

  ci = target()
    .description("Everything CI should gate on: check, test and build")
    .dependsOn(this.check, this.test, this.build)
    .executes(() => {});

  default = target()
    .description("Same as build")
    .dependsOn(this.build)
    .executes(() => {});
}

await run(AppBuild);
