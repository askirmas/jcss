import { isArray } from "util"

export {
  $typeof
}

const {isArray: $isArray} = Array

function $typeof(source: null) :"null" 
function $typeof(source: undefined) :"null" 
function $typeof(source: boolean) :"boolean" 
function $typeof(source: number) :"number" 
function $typeof(source: string) :"string"
function $typeof(source: (...args: any[]) => any) :"function"
function $typeof(source: Map<any, any>) :"array"
function $typeof(source: WeakMap<any, any>) :"map"
function $typeof(source: Set<any>) :"map"
function $typeof(source: WeakSet<any>) :"set"
function $typeof(source: Record<any, any>) :"object" 
/** Without Infinity and NaN */
function $typeof(source: any) {
  if (source === null || source === undefined)
    return "null"
  const type = typeof source
  // So and "function"
  if (type !== "object")
    return type
  if ($isArray(source))
    return "array"
  if (source instanceof Map || source instanceof WeakMap)
    return "map"
  if (source instanceof Set || source instanceof WeakSet)
    return "set"
  return type // === "object"
}