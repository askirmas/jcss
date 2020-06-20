export type definitions2enum<T extends {definitions: {[def: string]: unknown}}> = keyof T["definitions"]
export type RSet = Readonly<Set<string>>
