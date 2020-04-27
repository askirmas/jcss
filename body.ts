import { ScalarValue, Body } from "./definitions"

export {
  body2map
}

const {isArray} = Array
, propDelimiter = '-'

function body2map(body: Body) {
  const entries: (undefined | string | [string[], Body[string]])[] = Object.keys(body)
  , $return: Map<string, ScalarValue> = new Map()

  for (let i = 0; i < entries.length; i++) {
    const entry = entries[i]
    if (!entry)
      continue

    const {0: prop, 1: val}
    = isArray(entry)
    ? entry
    : {
      0: entry,
      1: body[entry]
    }
    , value = isArray(val) ? val.join('') : val

    if (value === null || typeof value !== 'object')
      $return.set(
        isArray(prop) ? prop.join(propDelimiter) : prop,
        value as Exclude<typeof value, Body>
      )
    else {
      const keys: (string|[string[], typeof value[string]])[] = Object.keys(value)
      , {length} = keys
      , props = isArray(prop) ? prop : [prop]
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

  return $return
}