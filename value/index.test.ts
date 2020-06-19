import {value2string} from "."
import testData from "./index.test.json"
import { DocTest, makeNot } from "../doctest/def"


describe(value2string.name, () => {
  const suites = testData as unknown as DocTest<typeof value2string>

  for (const name in suites)
    if (name !== "$schema")
      describe(name, () => {  
        suites[name].forEach(suite => {
          if (typeof suite === 'string')
            return it.todo(suite)

          const [status, description, arg, ret0, ret1, argNew] = suite
          , is = !makeNot(status)
          , v1 = value2string(arg)
          
          if (is === undefined)
            throw Error(`Unknown status '${status}' @ ${name}/${description}`)
          
          const exp1 = exp(is, v1, ret0)

          if (ret1 === undefined)
            it(description, exp1)
          else 
            describe(description, () => {
              it('1', exp1)
              it('2', exp(!is, v1, ret1))
              if (argNew !== undefined)
                it('3', exp(is, value2string(argNew), ret1))
            })
        })
      })
})

function exp(is: boolean, i: any, o: any) {
  return () => {
    const exp = expect(i)
    return (
      is ? exp : exp.not
    )
    .toBe(o)
  }
}