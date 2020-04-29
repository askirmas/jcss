import {body2assoc} from "./body"
import { ScalarValue } from "./util-defs"

it('1', () => expect(body2assoc({
  "": "empty string",
  "z-index": 0,
  "width": "800px",
  "height": [800, "px"],
  "grid": {
    "column": 5,
    "row-start": 2,
    "row": {
      "start": 1,
      "end": null
    }
  }
})).toStrictEqual(new Map([
  ["z-index", 0],
  ["width", "800px"],
  ["height", "800px"],
  ["grid-column", 5],
  ["grid-row-start", 1],
  ["grid-row-end", null],
] as [string, ScalarValue][])))

it('append to map', () => expect(body2assoc(
  {
    "height": [800, "px"]
  }, new Map([
    ["width", "800px"]
  ])
)).toStrictEqual(new Map([
  ["width", "800px"],
  ["height", "800px"]
])))

it('append to object', () => expect(body2assoc(
  {
    "height": [800, "px"]
  }, {
    "width": "800px"
  }
)).toStrictEqual({
  "width": "800px",
  "height": "800px"
}))

it('target object was changed', () => {
  const target = {
    "width": "800px"
  }
  expect(body2assoc(
    {
      "height": [800, "px"]
    },
    target 
  )).toStrictEqual(
    target
  )
})

it('target map was changed', () => {
  const target = new Map([
    ["width", "800px"]
  ])
  expect(body2assoc(
    {
      "height": [800, "px"]
    },
    target 
  )).toStrictEqual(
    target
  )
})
