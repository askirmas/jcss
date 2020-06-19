export {
  $typeof
}

const {isArray: $isArray} = Array

// Notation V1 
// function $typeof<T extends null>(source: T) :"null"
// function $typeof<T extends undefined>(source: T) :"null"
// function $typeof<T extends boolean>(source: T) :"boolean"
// function $typeof<T extends number>(source: T) :"number"
// function $typeof<T extends string>(source: T) :"string"
// function $typeof<T extends (...args: any[]) => any>(source: T) :"function"
// function $typeof<T extends Map<any, any>>(source: T) :"array"
// function $typeof<T extends WeakMap<any, any>>(source: T) :"map"
// function $typeof<T extends Set<any>>(source: T) :"map"
// function $typeof<T extends WeakSet<any>>(source: T) :"set"
// function $typeof<T extends Record<any, any>>(source: T) :"object"
// /** Without Infinity and NaN */
// function $typeof(source: any) {

// Notation V2
function $typeof<T>(
  source: T
) : T extends null|undefined ? "null"
  : T extends boolean ? "boolean"
  : T extends number ? "number"
  : T extends string ? "string"
  : T extends (...args: any[]) => any ? "function"
  : T extends any[]  ? "array"
  : T extends Set<any>  ? "set"
  : T extends WeakSet<any>  ? "set"
  : T extends Map<any, any>  ? "map"
  : T extends WeakMap<any, any>  ? "map"
  : "object"
{
  if (source === null || source === undefined)
    //@ts-ignore
    return "null"
  const type = typeof source
  // So and "function"
  if (type !== "object")
    //@ts-ignore
    return type
  if ($isArray(source))
    //@ts-ignore
    return "array"
  if (source instanceof Set || source instanceof WeakSet)
    //@ts-ignore
    return "set"
  if (source instanceof Map || source instanceof WeakMap)
    //@ts-ignore
    return "map"
  //@ts-ignore
  return type // === "object"
}