import {representation2map} from "./compose"

describe(representation2map.name, () => {
  it('empty', () => expect(representation2map([
  ])).toStrictEqual({
    "selectors2atoms": new Map(),
    "atoms2selectors": new Map(),
    "original": []
  }))

  it('only selector', () => expect(representation2map([
    "selector"
  ])).toStrictEqual({
    "selectors2atoms": new Map(),
    "atoms2selectors": new Map(),
    "original": [
      [["selector"], []]
    ]
  }))

  it('only body', () => expect(representation2map([
    {"background-color": "white"}
  ])).toStrictEqual({
    "selectors2atoms": new Map(),
    "atoms2selectors": new Map(),
    "original": [
      [[], ["background-color:white"]]
    ]
  }))

  it('selector, body', () => expect(representation2map([
    "selector",
    {"background-color": "white"}
  ])).toStrictEqual({
    "selectors2atoms": new Map([["selector", new Set(["background-color:white"])]]),
    "atoms2selectors": new Map([["background-color:white", new Set(["selector"])]]),
    "original": [
      [["selector"], ["background-color:white"]]
    ]
  }))

  it('body before selector', () => expect(representation2map([
    {"background-color": "white"},
    "selector"
  ])).toStrictEqual({
    "selectors2atoms": new Map(),
    "atoms2selectors": new Map(),
    "original": [
      [[], ["background-color:white"]],
      [["selector"], []]
    ]
  }))
})