import testData from "./index.doctest.json"
import { atoms } from "."
import runner from "../doctest/runner"
import { DocTest } from "../doctest/def"


describe(atoms.name, () => runner(
  atoms,
  testData as unknown as DocTest<typeof atoms, string>
))
