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
$ deno init --npm create-vite-extra
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
- add scripts for specific project

```diff
// root deno.json
{
  "scripts": {
+    "dev:{project}": "deno --env-file .env.development task --cwd ./apps/{project} dev"
  }
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

```bash
deno task dev:fa
```

### 5. Creating Library

To run local lib add this on vite.config.base.ts on project to fix alias on
rollup and esbuild
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

### 6. Tree shakeable assets

sample code on './libs/components/src/utils.ts' sample usage on './apps/test'

### 7. ENV variables

Environment Variables can be placed anywhere, Root DIR or per App.

```diff
  "scripts": {
    ...
-    "build:prod": "deno task --recursive build",
-    "build:dev": "deno task --recursive build",
+    "build:prod": "deno --env-file .env.prod task --recursive build",
+    "build:dev": "deno --env-file .env.development task --recursive build",
  }
```

run this to test both root dir and app env

```bash
$ deno task dev:test
```
