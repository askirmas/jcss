export type Element = Partial<
  iNot&iTag&iId&iClassList&iAttributes
>
type iNot = {not: iTag|iId|iClassList|iAttributes}
type iTag = {tag: string}
type iId = {id: string}
type iClassList = {classList: Set<string>|string[]}
type iAttributes = {
  attributes: iAttribute[]
}
export type iAttribute = [string]|[string, AttributeComparator, string]
type AttributeComparator = "="|"~="|"|="|"^="|"$="|"*="
export interface Body extends Record<string, any> {
  [property: string]: Value|Body
}

export type Value = ScalarValue|ScalarValue[]
export type ScalarValue = null|number|string
