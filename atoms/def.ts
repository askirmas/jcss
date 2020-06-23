import { notObject } from "../util-defs";

export type Atoms<Exp extends notObject = notObject>  = {[property: string]: Exp | Atoms<Exp>}