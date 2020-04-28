import {/*cartesianProductN, */cartesianProduct2} from "./utils"

// describe.skip(cartesianProductN.name, () => {
//   it("empty", () => expect(cartesianProductN([
//   ])).toStrictEqual([
//   ]))
//   it("1", () => expect(cartesianProductN([
//     1
//   ])).toStrictEqual([
//     [1]
//   ]))
//   it("[1]", () => expect(cartesianProductN([
//     [1]
//   ])).toStrictEqual([
//     [1]
//   ]))
//   it("1*1", () => expect(cartesianProductN(
//     [1, 2]
//   )).toStrictEqual([
//     [1, 2]
//   ]))
//   it("n", () => expect(cartesianProductN([
//     [1,2]
//   ])).toStrictEqual([
//     [1],
//     [2]
//   ]))
//   it("n*1*n", () => expect(cartesianProductN([
//     [1,2],
//     1,
//     [1,2]
//   ])).toStrictEqual([
//     [1,1,1],
//     [1,1,2],
//     [2,1,1],
//     [2,1,2]
//   ]))
// })

describe(cartesianProduct2.name, () => {
  it("0*1", () => expect(cartesianProduct2(
    [], "2"
  )).toStrictEqual([
  ]))
  it("1*0", () => expect(cartesianProduct2(
    "1", []
  )).toStrictEqual([
  ]))

  it("1*1", () => expect(cartesianProduct2(
    "1", "2"
  )).toStrictEqual([
    ["1", "2"]
  ]))
  it("[1]*[1]", () => expect(cartesianProduct2(
    ["1"], ["2"]
  )).toStrictEqual([
    ["1", "2"]
  ]))
  it("[1]*[n]", () => expect(cartesianProduct2(
    ["1"], ["2", "3"]
  )).toStrictEqual([
    ["1", "2"],
    ["1", "3"],
  ]))
  it("[n]*[1]", () => expect(cartesianProduct2(
    ["1", "2"], ["3"]
  )).toStrictEqual([
    ["1", "3"],
    ["2", "3"],
  ]))
  it("[n]*[n]", () => expect(cartesianProduct2(
    ["1", "2"], ["3", "4"]
  )).toStrictEqual([
    ["1", "3"],
    ["1", "4"],
    ["2", "3"],
    ["2", "4"],
  ]))
})

