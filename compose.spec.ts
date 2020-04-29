import {representation2map} from "./compose"

describe(representation2map.name, () => {
  it('huge', () => expect(representation2map([
    {
      "top-body": "ignored",
      "will be used": "for setup"
    },
    "el1",
    ["el2", "el3"],
    {
      "background-color": "white"
    },
    {
      "color": "black"
    },
    ["#id1", "#id2"],
    ".class",
    {
      "font-size": [16, "px"],
    },
    {
      "color": null
    },
    "tail selector"
  ])).toStrictEqual({
    "atoms2selectors": new Map([
      ["background-color:white", new Set(["el1", "el2", "el3"])],
      ["color:black", new Set(["el1", "el2", "el3"])],
      ["font-size:16px", new Set([".class", "#id1", "#id2"])],
    ]),
    "selectors2atoms": new Map([
      ["el1", new Set(["background-color:white", "color:black"])],
      ["el2", new Set(["background-color:white", "color:black"])],
      ["el3", new Set(["background-color:white", "color:black"])],
      [".class", new Set(["font-size:16px"])],
      ["#id1", new Set(["font-size:16px"])],
      ["#id2", new Set(["font-size:16px"])]
    ])
  }))
})