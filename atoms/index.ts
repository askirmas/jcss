import { Atoms } from "./def";
import { notObject, isNotObject } from "../util-defs";

const {keys: $keys} = Object
, propsDelimiter = "-"
, emptyString = ''

export {
  atoms
}

function atoms<E extends notObject = notObject>(body: Atoms<E>) :[string, E][]{
  type Tuple = [keyof Atoms<E>, E|Atoms<E>]
  const stack = [undefined] as (undefined|Tuple)[]
  , $return: [string, E][] = []

  for (let i = 0; i < stack.length && i > -1; i++) {
    const task = stack[i]
    , source = task === undefined ? body : task[1]
    , prop = task?.[0] ?? emptyString
    
    if (isNotObject(source)) {
      $return.push([prop, source])
      delete stack[i]
      continue
    }

    const scope = prop === emptyString ? emptyString : `${prop}${propsDelimiter}`
    , nextTasks = $keys(source) as Tuple[] | string[] 
    , {length} = nextTasks

    for (let i = 0; i < length; i++) {
      const key = nextTasks[i] as string
      , value = source[key]
      , nextKey = `${scope}${key}`

      nextTasks[i] = [nextKey, value]
    }
    
    stack.splice(i--, 1, ...nextTasks as typeof stack)      
  }

  return $return
}
