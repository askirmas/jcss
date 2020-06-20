export type orArray<T> = T | (T extends any[] ? T[number]: Array<T>)
export type Dict<T = any> = Exclude<{[prop: string]: T}, any[]>

export type Assoc<K extends string, V> = Map<K,V> | Record<K, V>
export type AssocKey<T extends Assoc<string, any>> = T extends Map<string, any> ? Parameters<T['set']>[0] : keyof T
export type AssocValue<T extends Assoc<string, any>> = T extends Map<string, any> ? Parameters<T['set']>[1] : T[keyof T]

export type Setish<V extends string> = Set<V> | Array<V>


export type ScalarValue = null|number|string

export type Grammar4Reg = Record<string, Term4Reg>
type Term4Reg = {
  prefix?: string
  word: string
  postfix?: string
}
