export type orArray<T> = T | (T extends any[] ? T[number]: Array<T>)

export type Assoc<K extends string, V> = Map<K,V> | Record<K, V>
export type AssocKey<T extends Assoc<string, any>> = T extends Map<string, any> ? Parameters<T['set']>[0] : keyof T
export type AssocValue<T extends Assoc<string, any>> = T extends Map<string, any> ? Parameters<T['set']>[1] : T[keyof T]

export type Setish<V extends string> = Set<V> | Array<V>

export type Nullish = null|undefined
export type Nullable<T> = Nullish | T

export type Stringish = null|number|string
// JSON primitives
export type JsonScalar = Stringish|boolean
export type JSScalar = JsonScalar|undefined|bigint|symbol
export type FlatDict<T extends JSScalar = JsonScalar> = {
  [key: string]: T
}
export type Dict<T extends JSScalar = JsonScalar> = {
  [key: string]: JSScalar | JSScalar[] | Dict<T>
}
export type Structural<T extends JSScalar = JsonScalar> = T | T[] | Dict<T>

export type Func<P extends any[] = any[], R extends any = any> = (...args: P) => R 
export type Monad = (arg: any) => any

