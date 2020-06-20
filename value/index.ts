import { Expression, Token, ToF } from "./defs";
import { $typeof } from "../typeof";
import { isUnit } from "../schemas/length-unit"
import { isCommaSeparated } from "../schemas/function";

const {keys: $keys} = Object
type Dict<T = any> = Exclude<{[prop: string]: T}, any[]>

const varPrefix = "$"
, functionPrefix = "@"

export {
  value2string,
  spacer
}

// TODO Without recursion
function value2string(source: Expression, delimiter = '') :Token {
  const type = $typeof(source)
  switch (type) {
    case "string":
      const str = source as string
      return str[0] !== varPrefix
      ? str
      : varRef(str)

    case "number":
      return source as number

    case "array":
      const flatted = (source as /*Extract<Expression, any[]>*/ ToF[])
      .map(v => value2string(v)) as Token[]
    
      for (let i = flatted.length; i--;)
        spacer(flatted[i], i, flatted)
    
      return flatted
      .join(delimiter)

    case "object":
      // Type 'null' is not assignable to type 'object'
      const fnName = $keys(source!)[0] as undefined | keyof Extract<Expression, Dict> & string
      if (typeof fnName !== "string")
        return null
      const value = value2string(
        //@ts-ignore
        source[fnName],
        fnName[0] === functionPrefix
        || isCommaSeparated(fnName)
        ? ','
        : ''
      )

      return (fnName[0] !== varPrefix) 
      ?`${fnName}(${value})`
      : varRef(fnName, value) 

    default:
      return null
  }
}

function spacer(token: Token, i: number, source: Token[]) {
  if (i === 0)
    return
  const prev = source[i - 1]

  if (
    typeof prev === "number"
    && typeof token === "string"
    && isUnit(token)
  )
    return

  return source[i] = ` ${token}`
}

function varRef(name: string, $default?: Token) {
  return `var(--${
    name.slice(1)
  }${
    $default === undefined || $default === null
    ? ""
    : `, ${$default}`
  })`
}