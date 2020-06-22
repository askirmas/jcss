/* global describe it */
import { Func } from "../util-defs"
import { DocTest, makeNot } from "./def"

export default runner

function runner<F extends Func>(fn: F, suites: DocTest<F>) {
  for (const name in suites)
  if (name !== "$schema")
    describe(name, () => {  
      suites[name].forEach(suite => {
        if (typeof suite === 'string')
          return it.todo(suite)

        const [status, description, [ret0, arg, ret1, argNew]] = suite
        , is = !makeNot(status)
        , v1 = fn(arg)
        
        /* istanbul ignore next */
        if (is === undefined)
          throw Error(`Unknown status '${status}' @ ${name}/${description}`)
        
        const exp1 = exp(is, v1, ret0)

        if (ret1 === undefined)
          it(description, exp1)
        else 
          describe(description, () => {
            it('1', exp1)
            it('2', exp(!is, v1, ret1))
            /* istanbul ignore next */
            if (argNew !== undefined)
              it('3', exp(is, fn(argNew), ret1))
          })
      })
    })

}

function exp(is: boolean, i: any, o: any) {
  return () => {
    const exp = expect(i)
    return (
      is ? exp : exp.not
    )
    .toBe(o)
  }
}