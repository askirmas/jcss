import {Tree} from "./definitions"

const {isArray} = Array

export {
  traverseTree
}

type traverseTreeTask = [string, string, Tree[string]]

function traverseTree(source: Tree) {
  const $return: Record<string, Record<string, any>> = {}
  , tasks: Array<undefined|string|traverseTreeTask> = Object.keys(source)

  let acc = undefined
  , previousWasCombinator = false

  for (let i = 0; i < tasks.length; i++) {
    const record = tasks[i]
    if (record === undefined) {
      acc = undefined
      previousWasCombinator = false
      continue
    }

    const [context, task, value] = typeof record === 'string'
    ? [undefined, record, source[record]]
    : record
    , isCombinator = task === '~'

    acc = `${
      acc ?? ''
    }${
      acc === undefined 
      ? ''
      : isCombinator
      ? ''
      : previousWasCombinator
      ? ''
      : '+'
    }${
      task
    }`

    const selector = `${
      context ?? ''
    }${
      acc
    }${
      isCombinator ? '*' : ''
    }`
    
    delete tasks[i]
    previousWasCombinator = isCombinator

    if (!value)
      continue
      
    if (isArray(value)) {
      if (value.length !== 0)
        $return[selector] = Object.assign($return[selector] ?? {}, ...value) 
      continue
    }

    const nexts = Object.keys(value)
    for (let i = nexts.length; i--;) {
      const key = nexts[i]
      , next: traverseTreeTask = [
        `${selector}>`,
        key,
        value[key]
      ]
      //@ts-ignore
      nexts[i] = next 
    }
    tasks.push(undefined, ...nexts)
  }

  return $return
}