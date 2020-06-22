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

const statusesTrue = new Set<eStatus>(["DONE", "LEG", "DEPR", "BUG-", "UNST"]) 
, statusesFalse = new Set<eStatus>(["WONT", "TBD", "BUG+", "OPT", "PROP"])

export {
  makeNot
}

function makeNot(status: eStatus) :boolean;
function makeNot(status: string) :undefined;
function makeNot(status: any) {
  if (statusesTrue.has(status))
    return false
  if (statusesFalse.has(status))
    return true
  return undefined
}

