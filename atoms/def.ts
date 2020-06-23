import { notObject } from "../util-defs";
import { Configurable } from "../config.def";

export type Atoms<Exp extends notObject = notObject>  = {[property: string]: Exp | Atoms<Exp>}
export type AtomsOptions = Configurable<"propSpace"|"propDelimiter"|"empty">