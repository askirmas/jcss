import {value2string} from "."
import testData from "./index.test.json"
import { DocTest } from "../doctest/def"

const {stringify: $stringify} = JSON

describe(value2string.name, () => {
  const suites = testData as unknown as DocTest<typeof value2string>

  for (const name in suites)
    if (name !== "$schema")
      describe(name, () => {  
        suites[name].forEach(suite => {
          if (typeof suite === 'string')
            return it.todo(suite)

          const [status, ret, quark, comment] = suite
          it(
            comment ?? $stringify(quark),
            () => {
              const exp = expect(value2string(quark))
              return (
                status === "DONE"
                || status === "DEPR"
                ? exp
                : exp.not
              )
              .toBe(ret)
            }
          )
        })
      })
})

