import {cartesianProductN, cartesianProduct2, $set} from "./utils"
import { Dict, Assoc } from "./util-defs"

describe(cartesianProductN.name, () => {
  it("empty", () => expect(cartesianProductN(
    []
  )).toStrictEqual(
    []
  ))

  it("1", () => expect(cartesianProductN(
    [1]
  )).toStrictEqual(
    1
  ))

  it("[1]", () => expect(cartesianProductN(
    [[1]]
  )).toStrictEqual(
    [1]
  ))

  it("1*1", () => expect(cartesianProductN(
    [1, 2]
  )).toStrictEqual(
    [[1, 2]]
  ))

  it("n", () => expect(cartesianProductN(
    [[1,2]]
  )).toStrictEqual(
    [1, 2]
  ))

  it("n*1*n", () => expect(cartesianProductN(
    [
      [1,2],
      1,
      [1,2]
    ]
  )).toStrictEqual(
    [
      [1,1,1],
      [1,1,2],
      [2,1,1],
      [2,1,2]
    ]
  ))
})

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

  it("[1,1]*[1,1]", () => expect(cartesianProduct2(
    [["1", "2"]], [["3", "4"]]
  )).toStrictEqual([
    ["1", "2", "3", "4"]
  ]))

  it("[n,n]*[n,n]", () => expect(cartesianProduct2(
    [["1", "2"], ["3", "4"]], [["1", "2"], ["3", "4"]]
  )).toStrictEqual([
    ["1", "2", "1", "2"],
    ["1", "2", "3", "4"],
    ["3", "4", "1", "2"],
    ["3", "4", "3", "4"]
  ]))
})

describe($set.name, () => {
  it('obj', () => expect($set(
    {"a": 1} as Dict, "b", 2
  )).toStrictEqual(
    {"a": 1, "b": 2}
  ))
  it('map', () => expect($set(
    new Map([["a", 1]]), "b", 2
  )).toStrictEqual(
    new Map([["a", 1], ["b", 2]])
  ))

  it('obj reflect', () => {
    const obj = {a: 1} as Dict
    expect($set(
      obj, "b", 2
    )).toStrictEqual(
      obj
    )
  })
  it('map reflect', () => {
    const map = new Map([["a", 1]])
    expect($set(
      map, "b", 2
    )).toStrictEqual(
      map
    )
  })

  it('ts', () => expect($set(
    {"a": 1} as Assoc<string,number>, "b", 2
  )).toStrictEqual(
    {"a": 1, "b": 2}
  ))
})

describe.skip('con and dis', () => {
  it('multi', () => expect([
    ["input", ".Input"],
    ["~", "~ *"],
    ".Target"
  ]).toStrictEqual([
    ["input", "~", ".Target"],
    [".Input", "~", ".Target"],
    ["input", "~ *", ".Target"],
    [".Input", "~ *", ".Target"],
  ]))

  it('add/rotate', () => expect([
    ["input", ".Input", null],
    [":checked", ".Checked", ".Input--Checked"],
    "~",
    ".Target"
  ]).toStrictEqual([
    ["input", ":checked", "~", ".Target"],
    [".Input", ".Checked", "~", ".Target"],
    [null, ".Input--Checked", "~", ".Target"]
  ]))

  it("multi add", () => expect([
    [
      [
        ["input", ".Input"],
        ".stateEntry",
        [":checked", ".Checked"]
      ]
    ],
    "~",
    [
      null,
      " "
    ],
    ".Target"
  ]).toStrictEqual([
    ["input", ".stateEntry", ":checked", "~", null, ".Target"],
    [".Input", ".stateEntry", ".Checked", "~", null, ".Target"],
    ["input", ".stateEntry", ":checked", "~", " ", ".Target"],
    [".Input", ".stateEntry", ".Checked", "~", " ", ".Target"],
  ]))

})