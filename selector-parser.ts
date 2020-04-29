import { Grammar4Reg } from "./util-defs"

export {
  selectorParser
}

const combinatorGrammar = {
  "next": {
    "prefix": "\\s*",
    "word": "\\+",
    "postfix": "\\s*"
  },
  "sibling": {
    "prefix": "\\s*",
    "word": "~",
    "postfix": "\\s*"
  },
  "child": {
    "prefix": "\\s*",
    "word": ">",
    "postfix": "\\s*"
  },
  "descendant": {
    "prefix": "\\s*",
    "word": "\\s",
    "postfix": "\\s*"
  }  
} as const
, word = '[a-zA-Z_-][a-zA-Z_0-9-]*'
//TODO option where array allowed?
, elementGrammar = {
  "tag": {
    word: `(\\*|${word})`
  },
  "class": {
    "prefix": "\\.",
    word
  },
  "id": {
    "prefix": "#",
    word
  },
  //TODO attribute
  //TODO attribute expression
  //TODO pseudo class
  //TODO pseudo class with parameter
  //TODO `:not()`
  //TODO pseudo element
} as const

type ElementEntities = keyof typeof elementGrammar
type CombinatorEntities = keyof typeof combinatorGrammar
type Entities = ElementEntities|CombinatorEntities
type Groups = {[group in Entities]: undefined|string}
type RegExOut = null | {groups: Groups}

const elementEntities = Object.keys(elementGrammar) as ElementEntities[]
, {length: elLength} = elementEntities
, combinators = Object.keys(combinatorGrammar) as CombinatorEntities[]
, {length: combLength} = combinators
, reg = composeParser({...elementGrammar, ...combinatorGrammar})

function selectorParser(selector: string) {
  const parsed: Array<
    CombinatorEntities
    | {[key in ElementEntities]?: string[]}
  > = []
  
  let token: RegExOut
  , extendPrevious = false
  
  
  tokenTaker:
  while (token = reg.exec(selector) as RegExOut, token) {
    const {groups} = token
    for (let i = combLength; i--;) {
      const combinator = combinators[i]
      , value = groups[combinator]
      if (value === undefined)
        continue
      extendPrevious = false
      parsed.push(combinator)
      continue tokenTaker
    }

    for (let i = elLength; i--;) {
      const entity = elementEntities[i]
      , value = groups[entity]
      if (value === undefined)
        continue

      if (!extendPrevious) {
        extendPrevious = true
        parsed.push({[entity]: [value]})
      } else {
        const expr = parsed[parsed.length - 1] as Exclude<typeof parsed[number], string>
        if (entity in expr)
          expr[entity]!.push(value)
        else
          expr[entity] = [value]
      }  
    }
  }  

  return parsed
}

function composeParser<T extends Grammar4Reg>(grammar: T) {
  const entities: Array<keyof T> = Object.keys(grammar)
  return new RegExp(`(${
    entities
    .map(entity => {
      const {
        word,
        //@ts-ignore Property 'prefix' does not exist on type
        prefix, postfix
      } = grammar[entity]
      //TODO somehow groups-less
      , named = `(?<${entity}>${word})`
      return `(${
        prefix ?? ''
      }${
        named
      }${
        postfix ?? ''
      })`
    })
    .join('|')
  })`,
  'y'
  )
}