#!/usr/bin/env node

import { DocTest, Func } from "./def";

const {log: $log} = console
, {stringify: $stringify} = JSON

if (module.parent === null) {
  const fileName = process.argv[2]
  if (!fileName)
    throw Error('No filename @ argument')

  const cwd = process.cwd()
  , data = require(`${cwd}/${fileName}`)

  $log(json2md(data).join("\n\n"))
}

export {
  json2md
}

function json2md<F extends Func>(source: DocTest<F>) :string[] {
  const $return: Array<undefined|string> = []

  for (const topic in source) {
    $return.push(`## ${topic}`)

    const data = source[topic]
    , {length} = data

    for (let i = 0; i < length; i++) {
      const record = data[i]

      if (typeof record === "string") {
        $return.push(`*${record}*`)
        continue
      }
      const [status, title, [i0, r0, r1, /*i1*/]] = record
      
      $return.push(
        `### ${title || i} ${status}`,
        [
          "```json",
          $stringify(i0),
          "```"
        ].join("\n"),
        [
          "```css",
          r0,
          "```"
        ].join("\n"),
        r1 && [
          "```css",
          r0,
          "```"
        ].join("\n"),

      )
    }
  }

  return $return.filter(Boolean) as Array<Exclude<typeof $return[number], undefined>>
}
