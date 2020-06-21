import { orArray, Stringish } from "./util-defs"

//TODO Replace `SimpleBody` with `Body`
export type CSSRepresentation = Array<string|string[]|SimpleBody>

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

//TODO extend `Assoc`: #TSError An interface can only extend an object type or intersection of object types with statically known members.
export interface Body extends Record<string, any> {
  [property: string]: Value|Body
}

type SimpleBody = {
  [property: string]: Value
}

//`orArray` doesn't work
export type Value = Stringish|Exclude<Stringish, null>[]


export type Grammar4Reg = Record<string, Term4Reg>
type Term4Reg = {
  prefix?: string
  word: string
  postfix?: string
}
