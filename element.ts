import { Element } from "./definitions";
import { attributeExpression2str } from "./attributes";

export {
  element2string
}

const {isArray} = Array

function element2string({id, not, tag, classList, attributes}: Element) :string {
  const factors: string[] = [
    tag2str(tag),
    
    !attributes
    ? ''
    : attributes.map(attributeExpression2str).join(''),
    
    id2str(id),
    
    //TODO split per property
    !not
    ? ''
    : `:not(${
      isArray(not)
      ? (
        // This expression is not callable. Each member of the union type has signatures, but none of those signatures are compatible with each other
        not as typeof not[number][]
      ).map(element2string).join('):not(')
      : element2string(not)
    })`,

    classList2str(classList)
  ]
  , $return = factors.join('')

  return $return || '*'
}

function id2str(id: Element["id"]) {
  return id ? `#${id}` : ''
}

function tag2str(tag: Element["tag"]) {
  return tag ?? ''
}

function classList2str(classList: Element['classList']) {
  if (classList === undefined)
    return ''

  return `.${
    typeof classList === 'string'
    ? classList
    : (
      isArray(classList)
      ? classList
      : [...classList]
    ).join('.')
  }`
}