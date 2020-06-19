export type StringLike = string|number
type orArray0<T> = T | T[]
type orArray1<T> = orArray0<orArray0<T>>
type orArray2<T> = orArray1<orArray1<T>>
export type orArray<T> = orArray2<T>

/**
 * //TODO Singletons
 * - https://stackoverflow.com/questions/57571664/typescript-type-for-an-object-with-only-one-key-no-union-type-allowed-as-a-key
 * - https://stackoverflow.com/questions/39190154/typescript-restrict-number-of-objects-properties 
 */
type CssFunction<T> = {[func: string]: T | CssFunction<T>}
type CssSimpleValue = orArray<StringLike>

export type CssValue = CssSimpleValue | CssFunction<CssSimpleValue>  
