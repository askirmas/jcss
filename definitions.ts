export {
  ScalarValue, Value, Body
}

interface Body {
  [property: string]: Value|Body
}

type Value = ScalarValue|ScalarValue[]
type ScalarValue = null|number|string

