import { CSSRepresentation } from "./definitions";
import { $isArray } from "./utils";

const propDelimiter = ':'

export {
  representation2map
}

function representation2map(source: CSSRepresentation) {
  const selectors2atoms: Map<string, Set<string>> = new Map()
  , atoms2selectors: Map<string, Set<string>> = new Map()

  let selectors: string[] = []
  , afterAtom = false
  , {length} = source

  for (let i = 0; i < length; i++) {
    const entry = source[i]
    if (typeof(entry) === 'string') {
      if (!afterAtom)
        selectors.push(entry)
      else {
        afterAtom = false
        selectors = [entry]
      }
    } else if ($isArray(entry)) {
      if (!afterAtom)
        selectors.push(...entry)
      else {
        afterAtom = false
        selectors = entry.slice()
      }
    } else {
      afterAtom = true
      const props = Object.keys(entry)
      
      for (let i = props.length; i--;) {
        const prop = props[i]
        , value = entry[prop]
        if (value === null)
          continue
        
        const atom = `${
          prop
        }${
          propDelimiter
        }${
          //TODO `Value` compiler
          $isArray(value) ? value.join('') : value
        }`

        for (let i = selectors.length; i--;) {
          const selector = selectors[i];

          (
            selectors2atoms.has(selector)
            ? selectors2atoms
            : selectors2atoms.set(selector, new Set())
          ).get(selector)!.add(atom);

          (
            atoms2selectors.has(atom)
            ? atoms2selectors
            : atoms2selectors.set(atom, new Set())
          ).get(atom)!.add(selector);
        }
      }
    }
  }

  return {
    selectors2atoms,
    atoms2selectors
  }
}