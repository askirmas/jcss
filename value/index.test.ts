import {value2string} from "."
import testData from "./index.doctest.json"
import { DocTest, makeNot } from "../doctest/def"
import runner from "../doctest/runner"

describe(value2string.name, () => runner(
  value2string,
  testData as unknown as DocTest<typeof value2string>
))

