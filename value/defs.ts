export type StringLike = string|number
type orArray0<T> = T | T[]
type orArray1<T> = orArray0<orArray0<T>>
type orArray2<T> = orArray1<orArray1<T>>
export type orArray<T> = orArray2<T>

export type CssValue = orArray<StringLike>
