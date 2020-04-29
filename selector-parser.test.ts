import {selectorParser} from "./selector-parser"

describe(selectorParser.name, () => {
  describe("falls => [{}]", () => {
    it('""', () => expect(selectorParser(
      ''
    )).toStrictEqual([
    ]))

    it('1', () => expect(selectorParser(
      '1'
    )).toStrictEqual([
    ]))

    it('##', () => expect(selectorParser(
      '##'
    )).toStrictEqual([
    ]))  
  })

  describe('1 element', () => {
    it('*', () => expect(selectorParser(
      '*'
    )).toStrictEqual([
      {tag: ["*"]}
    ]))

    it('tag', () => expect(selectorParser(
      'tag'
    )).toStrictEqual([
      {tag: ["tag"]}
    ]))

    it('id', () => expect(selectorParser(
      '#id'
    )).toStrictEqual([
      {id: ["id"]}
    ]))

    it('.class', () => expect(selectorParser(
      '.class'
    )).toStrictEqual([
      {class: ["class"]}
    ]))

    it('.class1.class2', () => expect(selectorParser(
      '.class1.class2'
    )).toStrictEqual([
      {class: ["class1", "class2"]}
    ]))

    it('tag#id.class', () => expect(selectorParser(
      'tag#id.class'
    )).toStrictEqual([
      {
        tag: ["tag"],
        id: ["id"],
        class: ["class"]
      }
    ]))  
  })

  describe('1 combinator', () => {
    it('el1 el2', () => expect(selectorParser(
      "el1 el2"
    )).toStrictEqual([
      {tag:["el1"]},
      "descendant",
      {tag:["el2"]}
    ]))

    it('el1 > el2', () => expect(selectorParser(
      "el1 > el2"
    )).toStrictEqual([
      {tag:["el1"]},
      "child",
      {tag:["el2"]}
    ]))

    it('el1~el2', () => expect(selectorParser(
      "el1~el2"
    )).toStrictEqual([
      {tag:["el1"]},
      "sibling",
      {tag:["el2"]}
    ]))

    it('el1   +   el2', () => expect(selectorParser(
      "el1   +   el2"
    )).toStrictEqual([
      {tag:["el1"]},
      "next",
      {tag:["el2"]}
    ]))
  })

  describe("false positive", () => {
    it('only combinators', () => expect(selectorParser(
      ">+~"
    )).toStrictEqual([
      "child",
      "next",
      "sibling"
    ]))
  })
})