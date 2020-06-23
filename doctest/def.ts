import schema from "./doctest.schema.json"
import { Func } from "../util-defs"

export type eStatus = keyof typeof schema["definitions"]["Status"]["definitions"]

export type Suite<A, R> = [R, A, R?, A?]

export type DocTest<F extends Func, Status extends string = eStatus> = {
  $schema: string
} & {
  [Topic: string]: string | Array<string|[
    Status,
    string,
    Suite<Parameters<F>, ReturnType<F>>
  ]>
}

const statusesTrue = new Set(["DONE", "LEG", "DEPR", "BUG-", "UNST"]) 
, statusesFalse = new Set(["WONT", "TBD", "BUG+", "OPT", "PROP"])

export {
  makeNot
}

function makeNot(status: eStatus | string) :boolean|undefined {
  if (statusesTrue.has(status))
    return false
  if (statusesFalse.has(status))
    return true
  return undefined
}

