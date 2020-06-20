import { RSet, definitions2enum } from "./defs"
import absoluteSchema from "./absolute-length_unit.schema.json"
import relativeSchema from "./relative-length_unit.schema.json"
import gridSchema from "./grid-length_unit.schema.json"

type eAbsolute = definitions2enum<typeof absoluteSchema>
type eRelative = definitions2enum<typeof relativeSchema>
type eGrid = definitions2enum<typeof gridSchema>
export type eUnit = eAbsolute | eRelative | eGrid

const UNIT = new Set([
  ...absoluteSchema.enum,
  ...relativeSchema.enum,
  ...gridSchema.enum,
]) as RSet

export {
  isUnit
}

function isUnit(token: string) :token is eUnit {
  return UNIT.has(token)
}
