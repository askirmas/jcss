import {makeNot, eStatus} from "./def"

describe(makeNot.name, () => {
  it("Unknown status", () => expect(makeNot(
    "" as eStatus
  )).toBe(
    undefined
  ))
})