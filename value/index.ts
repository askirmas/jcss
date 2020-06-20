import { Expression, Token, ToF } from "./defs";
import {
  varPrefix,
  functionPrefix,
  cssVarPrefix,
  cssVarCallPrefix,
  comma,
  space,
  empty,
  brl,
  brr
} from "./config.json"
import { $typeof } from "../typeof";
import { isUnit } from "../schemas/length-unit"
import { isCommaSeparated } from "../schemas/function";

type Dict<T = any> = Exclude<{[prop: string]: T}, any[]>

const {keys: $keys} = Object
, varPrefixLength = varPrefix.length

export {
  value2string,
  spacer
}

// TODO Without recursion
function value2string(source: Expression, delimiter = empty) :Token {
  const type = $typeof(source)
  switch (type) {
    case "string":
      const str = source as string
      return !isVar(str)
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
          ? comma
          : empty
        )

        fnNames[i] = (!isVar(fnName))
        ?`${fnName}${brl}${value}${brr}`
        : varRef(fnName, value)
      }

      return fnNames.join(space)

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

  return source[i] = `${space}${token}`
}

function varRef(name: string, $default?: Token) {
  return `${
    cssVarCallPrefix
  }${
    brl
  }${
    cssVarPrefix
  }${
    name.slice(varPrefixLength)
  }${
    $default === undefined || $default === null
    ? empty
    : `${comma}${space}${$default}`
  }${brr}`
}

function isVar(name: string) {
  /* istanbul ignore next Will be solved on different targets of quarks */
  return varPrefixLength === 1
  ? name[0] === varPrefix
  : name.startsWith(varPrefix)
}