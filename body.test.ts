import {body2map} from "./body"
import {ScalarValue} from "./definitions"

it('1', () => expect(body2map({
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