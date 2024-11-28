/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_TEST_ENV: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
