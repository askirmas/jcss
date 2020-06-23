import { Atoms, AtomsOptions } from "./def";
import { notObject, isNotObject } from "../util-defs";
import {
  propDelimiter,
  empty,
  propSpace
} from "../config.json"

const {keys: $keys} = Object

export {
  atoms
}

function atoms<E extends notObject = notObject>(
  body: Atoms<E>,
  {
    propDelimiter: delimiter = propDelimiter, 
    empty: emp = empty,
    propSpace: _space = propSpace
  }: AtomsOptions = {}
) :[string, E][]{
  type Tuple = [keyof Atoms<E>, E|Atoms<E>]
  const stack = [undefined] as (undefined|Tuple)[]
  , $return: [string, E][] = []
  , space = _space === emp ? emp : `${_space}${delimiter}`
  for (let i = 0; i < stack.length && i > -1; i++) {
    const task = stack[i]
    , source = task === undefined ? body : task[1]
    , prop = task?.[0] ?? emp
    
    if (isNotObject(source)) {
      $return.push([prop, source])
      delete stack[i]
      continue
    }

    const scope = `${space}${prop}${prop === emp ? emp : delimiter}`
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
