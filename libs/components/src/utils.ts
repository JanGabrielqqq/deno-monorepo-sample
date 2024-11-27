// @ts-ignore import meta glob not found
const img = import.meta.glob("../assets/**/*.svg", { eager: true })
const requestImageFileGlob =
  // deno-lint-ignore no-explicit-any
  (globEager: any) => (name: string, fallback?: string): string => {
    const key = Object.keys(globEager).find((val) =>
      val.includes(name.replace(/(\.\/|\.js)/g, ""))
    )
    if (key == null) return fallback || ""
    return globEager[key].default
  }

export const requestFile: (file: string) => string = requestImageFileGlob(img)
