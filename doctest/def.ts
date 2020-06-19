import schema from "./schema.json"

export type eStatus = keyof typeof schema["definitions"]["Status"]["definitions"]

export type Suite<A, R> = [eStatus, R, A, any?]

export type Monad = (arg: any) => any

export type DocTest<F extends Monad> = {
  $schema: string
} & {
  [Topic: string]: Array<string|Suite<Parameters<F>[0], ReturnType<F>>>
}