import {value2string} from "."
import testData from "./index.test.json"

const {stringify: $stringify} = JSON

type iFn1 = (arg: any) => any
type UnitWithoutComment<F extends iFn1> = ["+"|null, ReturnType<F>, Parameters<F>[0]]
type UnitWithComment<F extends iFn1> = [UnitWithoutComment<F>[0], UnitWithoutComment<F>[1], UnitWithoutComment<F>[2], string]
type Unit<F extends iFn1> = UnitWithComment<F> | UnitWithoutComment<F>
type Suites<F extends iFn1> = {[suite: string]: Array<string|Unit<F>>}

describe(value2string.name, () => {
  //@ts-ignore
  const suites: Suites<typeof value2string> = testData

  for (const name in suites)
    describe(name, () => {  
      suites[name].forEach(suite => {
        if (typeof suite === 'string')
          return it.todo(suite)

        const [control, ret, quark, comment] = suite
        it(
          `${$stringify(quark)} ${comment ?? ''}`,
          () => {
            const exp = expect(value2string(quark))
            return (
              control == null ? exp.not : exp
            )
            .toBe(ret)
          }
        )
      })
    })
})

