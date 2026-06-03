/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_PRODUCTION_DOMAIN: string
  readonly VITE_COUNTAPI_NAMESPACE: string
  readonly VITE_COUNTAPI_KEY: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
