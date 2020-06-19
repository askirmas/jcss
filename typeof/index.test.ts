import { $typeof } from "."

describe($typeof.name, () => {
  const suites = {
    "null": [null, undefined],
    "boolean": [false, true],
    "number": [0, Infinity, NaN],
    "string": [""],
    "function": [() => {}, new Function()],
    "array": [[]],
    "map": [new Map(), new WeakMap()],
    "set": [new Set(), new WeakSet],
    "object": [{}, new String()]
  } as const

  for (const type in suites)
    suites[type as keyof typeof suites]
    .forEach((value: any) =>
      it(`${value}: ${type}`, () => expect($typeof(value)).toBe(type))
    )
})