# Deno Monorepo

Sample Monorepo using Deno Vite React Typescript With Shared Components

## Getting Started

1. Install Deno
   [Installation Docs](https://docs.deno.com/runtime/getting_started/installation)

2. Setting up your editor/IDE
   [IDE Docs](https://docs.deno.com/runtime/getting_started/setup_your_environment/#setting-up-your-editor%2Fide)

## Important Notes

### 1. Dependencies

> All dependencies set on root `deno.json` are shared on all workspace if a
> dependency only used on 1 workspace declare it on its own deno.json file

### 2. `CompileOptions`

> Currently, **Deno** don't allow multiple `compileOptions`
> [(reference)](https://docs.deno.com/runtime/fundamentals/workspaces/#configuring-built-in-deno-tools:~:text=Notes-,compilerOptions,-%E2%9C%85).
> So all `compileOptions` are set only on root `deno.json`.

### 3. Creating new project

use [Create Vite Extra](https://github.com/bluwy/create-vite-extra)

```bash
$ deno run -A npm:create-vite-extra
```

select `deno-react` | `typescript`

> **NOTE:** this is not developed for monorepo. In order to work do the
> following steps.

- on `deno.json` empty imports since all initial dependencies are at root
  `deno.json`
- remove `compileOptions`
- add the following on task

```diff
{
  "task": [
    ...
+    "check": "deno check src/",
+    "format": "deno fmt src/"
  ]
}
```

- add the project directory on root `deno.json` `>` workspace array
- and also add title for modo to identify the project (optional could use
  "./apps/{dir}" to run on modo)

```diff
// root deno.json
{
+ "title": "{project}",
  "workspace": [
    ...
+   './apps/{project}'
  ]
}
```

- Delete public directory
- replace all vite.config.ts content with export from vite.cofig.base.ts
```diff
+ export { default } from "../../vite.config.base.ts"
```

### 4. Run Scripts

what we use: [Modo](https://jsr.io/@quffe/modo)

> **Note:** **Modo** run any tasks or scripts that match the provided task.

Example to run all project with "dev":

```bash
$ deno task modo dev
```

Example to run dev on firstapp directory:

```bash
$ deno task modo dev -d firstapp
```

Example to run build on all projects except libs folder
```bash
$ deno task modo build -x ./libs/
```

### 5. Creating Library

To run local lib add this on vite.config.base.ts on project to to fix alias on rollup
and esbuild
[(reference)](https://github.com/denoland/deno-vite-plugin/issues/19#issue-2596281103)

> **Note:** required on deno.json name, exports, version

```diff
// vite.config.base.ts
export default defineConfig({
+  resolve: {
+    alias: {
+      "@scope/components": join(dirname(fromFileUrl(import.meta.url)), "../../libs/components/mod.tsx")
+    }
+  }
})
```
