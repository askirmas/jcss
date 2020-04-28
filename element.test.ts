import {element2string} from "./element"

describe(element2string.name, () => {
  it('empty', () => expect(element2string({
  })).toBe(
    "*"
  ))
  it('classList: Set', () => expect(element2string({
    "classList": new Set(["cl1", "cl2"])
  })).toBe(
    ".cl1.cl2"
  ))
  it('not: Element', () => expect(element2string({
    "not": {"id": "id"}
  })).toBe(
    ":not(#id)"
  ))
  it('all', () => expect(element2string({
    "id": "id",
    "classList": ["cl1", "cl2"],
    "tag": "tag",
    "attributes": [["data-a", "=", "a"], ["data-b"]],
    "not": [
      {
        "id": "id",
        "classList": "classList",
        "tag": "tag",
        "attributes": [
          //@ts-ignore Type 'string' is not assignable to type '"=" | "~=" | "|=" | "^=" | "$=" | "*=" | undefined
          ["data-a", "=", "a"],
          ["data-b"]
        ],
      }      
    ] 
  })).toBe(
    'tag[data-a="a"][data-b]#id:not(tag[data-a="a"][data-b]#id.classList).cl1.cl2'
  ))
})