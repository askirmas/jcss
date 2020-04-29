export {
  selectorParser
}

const word = '[a-zA-Z_-][a-zA-Z_0-9-]*'
//TODO array allowed
, grammar = {
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
} as const

type Entities = keyof typeof grammar
type Groups = {[group in Entities]: undefined|string}
type RegExOut = null | {groups: Groups}

const entities = Object.keys(grammar) as Entities[]
, {length} = entities
, reg = new RegExp(`(${
    entities
    .map(entity => {
      const {
        word,
        //@ts-ignore
        prefix
      } = grammar[entity]
      , named = `(?<${entity}>${word})`
      return `(${
        prefix ?? ''
      }${
        named
      })`
    })
    .join('|')
  })`,
  'y'
)

function selectorParser(selector: string) {
  const parsed: {[key in Entities]?: string[]}[] = [{}]
  , expression = parsed[0]
  let token = reg.exec(selector) as RegExOut
  while (token) {
    const {groups} = token
    for (let i = length; i--;) {
      const entity = entities[i]
      , value = groups[entity] 
      if (value === undefined)
        continue

      if (entity in expression)
        expression[entity]!.push(value)
      else
        expression[entity] = [value]      
    }

    token = reg.exec(selector) as RegExOut
  }  

  return parsed
}