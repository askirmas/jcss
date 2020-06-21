import { Body } from "./definitions"
import { $isArray, $set } from "./utils"
import { Assoc, Stringish } from "./util-defs"

export {
  body2assoc as body2assoc
}

const propDelimiter = '-'

function body2assoc(body: Body, target: Assoc<string, Stringish> = new Map()) {
  const entries: (undefined | string | [string[], Body[string]])[] = Object.keys(body)

  for (let i = 0; i < entries.length; i++) {
    const entry = entries[i]
    if (!entry)
      continue

    const {0: prop, 1: val}
    = $isArray(entry)
    ? entry
    : {
      0: entry,
      1: body[entry]
    }
    , value = $isArray(val) ? val.join('') : val

    if (value === null || typeof value !== 'object')
      $set(
        target,
        $isArray(prop) ? prop.join(propDelimiter) : prop,
        value
      )
    else {
      const keys: (string|[string[], typeof value[string]])[] = Object.keys(value)
      , {length} = keys
      , props = $isArray(prop) ? prop : [prop]
      for (let i = length; i--; ) {
        const key = keys[i] as string
        keys[i] = [
          props.concat(key),
          value[key]
        ]
      }
      delete entries[i]
      entries.push(...keys)
    }
  }

  return target
}