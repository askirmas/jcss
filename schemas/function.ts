import { RSet, definitions2enum } from "./defs"
import commaSeparatedSchema from "./comma_separated-function.schema.json"

type eCommaSeparated = definitions2enum<typeof commaSeparatedSchema>

const COMMA_SEPARATED = new Set(commaSeparatedSchema.enum) as RSet

export {
  isCommaSeparated
}

function isCommaSeparated(functionName: string) :functionName is eCommaSeparated {
  return COMMA_SEPARATED.has(functionName)
}