/// <reference types="vite/client" />
interface ImportMetaEnv {
  readonly VITE_APP_TEST_TWO: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
