import {traverseTree} from "./selector"

it.skip("complex tree", () => expect(traverseTree({
  "body": {
    "div": [],
    "~": {
      "": [],
      " ": []
    },
    "section": [],
    " ": {
      "main": []
    },
    "$ ": {
      "main": []
    }

  }
})).toStrictEqual({
  "body>div": {},
  "body>div~*": {},
  "body>div~section": {},
  "body>div~section+* main": {},
  "body main": {},
}))

it.skip("bem", () => expect(traverseTree({
  ".block": {
    "": [{
      "background": "white"
    }],
    "&__entity1": [{
      "background": "red"
    }],
    "&__entity2": {
      "&": [{
        "background": "green"
      }],
      "&--modifier": [{
        "background": "blue"
      }]
    }
  }
})).toStrictEqual({
  ".block": {
    "background": "white"
  },
  ".block__entity1": {
    "background": "red"
  },
  ".block__entity2": {
    "background": "green"
  },
  ".block__entity2--modifier": {
    "background": "blue"
  }
}))
