import { Stringish } from "../util-defs"

export type Token = Stringish

/**
 * //TODO As Singleton
 * - https://stackoverflow.com/questions/57571664/typescript-type-for-an-object-with-only-one-key-no-union-type-allowed-as-a-key
 * - https://stackoverflow.com/questions/39190154/typescript-restrict-number-of-objects-properties 
 */
type Func = {[f: string]: Expression}
export type ToF = Token | Func

export type Expression = ToF | ToF[] | Array<ToF | ToF[]>