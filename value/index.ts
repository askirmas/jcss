import { CssValue, StringLike } from "./defs";
import { $typeof } from "../typeof";
import { isUnit } from "../schemas/length-unit"

const {keys: $keys} = Object
type Dict<T = any> = Exclude<{[prop: string]: T}, any[]>

const varPrefix = "$"

export {
  value2string,
  spacer
}

// TODO Without recursion
function value2string(source: CssValue) :StringLike {
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
      const flatted = (source as Extract<CssValue, any[]>)
      .flat()
      .map(v => value2string(v)) as StringLike[]
    
      for (let i = flatted.length; i--;)
        spacer(flatted[i], i, flatted)
    
      return flatted
      .join('')

    case "object":
      // Type 'null' is not assignable to type 'object'
      const fnName = $keys(source!)[0] as undefined | keyof Extract<CssValue, Dict> & string
      if (typeof fnName !== "string")
        return null
      const value = value2string(
        //@ts-ignore
        source[fnName]
      )

      return (fnName[0] !== varPrefix) 
      ?`${fnName}(${value})`
      : varRef(fnName, value) 

    default:
      return null
  }
}

function spacer(token: StringLike, i: number, source: StringLike[]) {
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

function varRef(name: string, $default?: StringLike) {
  return `var(--${
    name.slice(1)
  }${
    $default === undefined || $default === null
    ? ""
    : `, ${$default}`
  })`
}