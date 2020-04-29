import {selectorParser} from "./selector-parser"

describe(selectorParser.name, () => {
  describe("falls => [{}]", () => {
    it('""', () => expect(selectorParser(
      ''
    )).toStrictEqual([[
    ]]))

    it('1', () => expect(selectorParser(
      '1'
    )).toStrictEqual([[
    ]]))

    it('##', () => expect(selectorParser(
      '##'
    )).toStrictEqual([[
    ]]))  
  })

  describe('1 token', () => {
    it('*', () => expect(selectorParser(
      '*'
    )).toStrictEqual([[
      {tag: ["*"]}
    ]]))

    it('tag', () => expect(selectorParser(
      'tag'
    )).toStrictEqual([[
      {tag: ["tag"]}
    ]]))

    it('#id', () => expect(selectorParser(
      '#id'
    )).toStrictEqual([[
      {id: ["id"]}
    ]]))

    it('.class', () => expect(selectorParser(
      '.class'
    )).toStrictEqual([[
      {class: ["class"]}
    ]]))

    it('[attribute]', () => expect(selectorParser(
      '[attribute]'
    )).toStrictEqual([[
      {attribute: ["attribute"]}
    ]]))

    it(':pseudoClass', () => expect(selectorParser(
      ':pseudoClass'
    )).toStrictEqual([[
      {pseudoClass: ["pseudoClass"]}
    ]]))

    it('::pseudoElement-line', () => expect(selectorParser(
      '::pseudoElement'
    )).toStrictEqual([[
      {pseudoElement: ["pseudoElement"]}
    ]]))

    it.todo(':not()')
    it.todo(':pseudo(a5)')
    it.todo("[attr^=xxx]")
    it.todo("[attr^='xxx']")
    it.todo('[attr^="xxx"]')
  })
  
  it('1 element', () => expect(selectorParser(
    '*#id1:required.class1.class2[attr1]tag[attr2]#id1::pseudo::before:only-child'
  )).toStrictEqual([[
    {
      tag: ["*","tag"],
      id: ["id1", "id1"],
      class: ["class1", "class2"],
      attribute: ["attr1", "attr2"],
      pseudoElement: ["pseudo", "before"],
      pseudoClass: ["required", "only-child"]
    }
  ]]))  

  describe('1 combinator', () => {
    it('el1 el2', () => expect(selectorParser(
      "el1 el2"
    )).toStrictEqual([[
      {tag:["el1"]},
      "descendant",
      {tag:["el2"]}
    ]]))

    it('el1 > el2', () => expect(selectorParser(
      "el1 > el2"
    )).toStrictEqual([[
      {tag:["el1"]},
      "child",
      {tag:["el2"]}
    ]]))

    it('el1~el2', () => expect(selectorParser(
      "el1~el2"
    )).toStrictEqual([[
      {tag:["el1"]},
      "sibling",
      {tag:["el2"]}
    ]]))

    it('el1   +   el2', () => expect(selectorParser(
      "el1   +   el2"
    )).toStrictEqual([[
      {tag:["el1"]},
      "next",
      {tag:["el2"]}
    ]]))
  })

  it.skip('el, el2', () => expect(selectorParser(
    "el1, el2"
  )).toStrictEqual([
    [{tag: "el1"}],
    [{tag: "el2"}],
  ]))

  describe("false positive", () => {
    it('only combinators', () => expect(selectorParser(
      ">+~"
    )).toStrictEqual([[
      "child",
      "next",
      "sibling"
    ]]))
  })
})