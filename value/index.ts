import { CssValue, StringLike } from "./defs";

export {
  value2string,
  spacer
}

function value2string(source: CssValue) :string {
  switch (typeof source) {
    case "string":
      return source
    case "number":
      return `${source}`
  }
  
  const flatted = source.flat() as StringLike[]
  //.filter(s => s !== "")

  for (let i = flatted.length; i--;)
    spacer(flatted[i], i, flatted)

  return flatted
  .join('')
}

function spacer(token: StringLike, i: number, source: StringLike[]) {
  if (i === 0)
    return
  const prev = source[i - 1]

  if (
    typeof prev === "number"
    && typeof token === "string"
  )
    return

  return source[i] = ` ${token}`
}