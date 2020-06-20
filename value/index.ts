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
      const fnNames = $keys(source! as Extract<Expression, Dict>)
      , {length} = fnNames
      if (length === 0)
        return null

      for (let i = length; i--;) {
        const fnName = fnNames[i]
        , value = value2string(
          //@ts-ignore
          source[fnName],
          fnName[0] === functionPrefix
          || isCommaSeparated(fnName)
          ? ','
          : ''
        )

        fnNames[i] = (fnName[0] !== varPrefix) 
        ?`${fnName}(${value})`
        : varRef(fnName, value)
      }

      return fnNames.join(" ")

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