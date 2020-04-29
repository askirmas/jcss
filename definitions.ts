type orArray<T> = T | (T extends any[] ? T[number]: T[])
type Dict = Record<string, any>

export interface Tree extends Dict {
  [selector: string]: null|Tree|Body[]
}

export type Element = Partial<
  iNot&iTag&iId&iClassList&iAttributes
>
// TODO: `Element` without `iNot`
type iNot = {not: orArray<iTag|iId|iClassList|iAttributes>}
type iTag = {tag: string}
type iId = {id: string}
type iClassList = {classList: Set<string>|string[]|string}
type iAttributes = {
  attributes: iAttribute[]
}
export type iAttribute = [string]|[string, AttributeComparator, string]
type AttributeComparator = "="|"~="|"|="|"^="|"$="|"*="
export interface Body extends Dict {
  [property: string]: Value|Body
}

export type Value = ScalarValue|ScalarValue[]
export type ScalarValue = null|number|string
