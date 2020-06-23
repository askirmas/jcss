export type Config = {
  "varPrefix": string
  "functionPrefix": string
  "cssVarPrefix": string
  "cssVarCallPrefix": string
  "comma": string
  "space": string
  "empty": string
  "brl": string
  "brr": string
  "propDelimiter": string
  "propSpace": string
}

export type Configurable<P extends keyof Config> = Partial<Pick<Config, P>>