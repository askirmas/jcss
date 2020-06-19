import schema from "./schema.json"

export type eStatus = keyof typeof schema["definitions"]["Status"]["definitions"]

export type Suite<A, R> = [eStatus, string, A, R, R?, A?]

export type Monad = (arg: any) => any

export type DocTest<F extends Monad> = {
  $schema: string
} & {
  [Topic: string]: Array<string|Suite<Parameters<F>[0], ReturnType<F>>>
}

const statusesTrue = new Set<eStatus>(["DONE", "LEG", "DEPR", "BUG-", "UNST"]) 
, statusesFalse = new Set<eStatus>(["WONT", "TBD", "BUG+", "OPT", "PROP"])
export {
  makeNot
}

function makeNot(status: eStatus) {
  if (statusesTrue.has(status))
    return false
  if (statusesFalse.has(status))
    return true
}

