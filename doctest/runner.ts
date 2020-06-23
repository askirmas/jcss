import { Func } from "../util-defs"
import { DocTest, makeNot, eStatus } from "./def"

const args = new Set(process.argv)
/* istanbul ignore next */
, isWatching = args.has('--watch') || args.has('--watchAll')
, ONLY = "ONLY"
, SKIP = "SKIP"

export default runner

function runner<F extends Func, S extends string = eStatus>(fn: F, suites: DocTest<F, S>) {
  for (const name in suites) {
    if (name === "$schema")
      continue
      
    describe(name, () => {
      const incidentsData = suites[name]

      if (typeof incidentsData === "string") {
        it.todo(incidentsData)
        return 
      }

      incidentsData.forEach(suite => {
        if (typeof suite === 'string') {
          it.todo(suite)
          return
        }
        
        /* istanbul ignore next */
        const [status, description, [ret0, arg, ret1, argNew]] = suite
        /* istanbul ignore next */
        , isOnly = isWatching && status === ONLY
        /* istanbul ignore next */
        , isSkip = isWatching && status === SKIP
        /* istanbul ignore next TODO it*/
        , isNot = isOnly || isSkip ? false : makeNot(status)
        
        /* istanbul ignore next TODO it*/
        if (isNot === undefined)
          throw Error(`Unknown status '${status}' @ ${name}/${description}`)
        
        const v1 = () => fn(...arg)
        , expin = exp(!isNot, v1, ret0)

        if (ret1 === undefined)
          suiteMode(it, isSkip, isOnly)(
            description, expin
          )
        else
          suiteMode(describe, isSkip, isOnly)(
            description, () => {
              it('1', expin)
              it('2', exp(isNot, v1, ret1))
              /* istanbul ignore next */
              if (argNew !== undefined)
                it('3', exp(!isNot, () => fn(...argNew), ret1))
            }
          )
      })
    })
  }

}

function exp(is: boolean, i: any, o: any) {
  return () => {
    const exp = expect(i())
    return (
      is ? exp : exp.not
    )
    .toStrictEqual(o)
  }
}

/* istanbul ignore next */
function suiteMode(source: typeof it | typeof describe, skip: boolean, only: boolean) {
  return skip ? source.skip : only ? source.only : source
} 