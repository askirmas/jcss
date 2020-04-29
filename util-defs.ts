export type orArray<T> = T | (T extends any[] ? T[number]: Array<T>)
export type Dict = Record<string, any>

export type Assoc<K extends string,V> = Map<K,V> | Record<K, V>
export type ScalarValue = null|number|string