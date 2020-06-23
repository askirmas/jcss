/* global describe it */
import { Func } from "../util-defs"
import { DocTest, makeNot, eStatus } from "./def"

const ONLY = "ONLY"

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
        if (typeof suite === 'string')
          return it.todo(suite)

        const [status, description, [ret0, arg, ret1, argNew]] = suite
        , isOnly = status === ONLY
        , is = !makeNot(status)
        , v1 = () => fn(...arg)
        
        /* istanbul ignore next */
        if (is === undefined)
          throw Error(`Unknown status '${status}' @ ${name}/${description}`)
        
        const expin = exp(is, v1, ret0)

        if (ret1 === undefined)
          (
            /* istanbul ignore next */
            isOnly ? it.only : it
          )(description, expin)
        else 
          (
            /* istanbul ignore next */
            isOnly ? describe.only : describe
          )(description, () => {
            it('1', expin)
            it('2', exp(!is, v1, ret1))
            /* istanbul ignore next */
            if (argNew !== undefined)
              it('3', exp(is, () => fn(...argNew), ret1))
          })
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