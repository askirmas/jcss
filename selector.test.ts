import {traverseTree} from "./selector"

describe("empties", () => {
  it("null => {}", () => expect(traverseTree({
    "null": null
  })).toStrictEqual({
  }))
  it("[] => {}", () => expect(traverseTree({
    "[]": []
  })).toStrictEqual({
  }))
  it("{} => {}", () => expect(traverseTree({
    "{}": {}
  })).toStrictEqual({
  }))
  it("[{}]", () => expect(traverseTree({
    "[{}]": [{}]
  })).toStrictEqual({
    "[{}]": {}
  }))
})

describe("single", () => {
  it("element", () => expect(traverseTree({
    "element": [{
      "background-color": "white"
    }]
  })).toStrictEqual({
    "element": {
      "background-color": "white"
    }
  }))
  it("~element", () => expect(traverseTree({
    "~element": [{
      "background-color": "white"
    }]
  })).toStrictEqual({
    "*~element": {
      "background-color": "white"
    }
  }))
  it("element>", () => expect(traverseTree({
    "element>": [{
      "background-color": "white"
    }]
  })).toStrictEqual({
    "element>*": {
      "background-color": "white"
    }
  }))
  it(" element+", () => expect(traverseTree({
    " element+": [{
      "background-color": "white"
    }]
  })).toStrictEqual({
    "* element+*": {
      "background-color": "white"
    }
  }))
})

describe("pairs", () => {
  it("independent", () => expect(traverseTree({
    "element1": [{
      "background-color": "white"
    }],
    "element2": [{
      "background-color": "white"
    }]
  })).toStrictEqual({
    "element1": {
      "background-color": "white"
    },
    "element2": {
      "background-color": "white"
    }
  }))

  it("neighbors `,`", () => expect(traverseTree({
    "element1": [{
      "color": "black"
    }],
    ",": null,
    "element2": [{
      "background-color": "white"
    }]
  })).toStrictEqual({
    "element1": {
      "color": "black"
    },
    "element1,element2": {
      "background-color": "white"
    }
  }))

  describe("next `+`", () => {
    it('"element1","+","element2"', () => expect(traverseTree({
      "element1": null,
      "+": null,
      "element2": [{
        "background-color": "white"
      }]
    })).toStrictEqual({
      "element1+element2": {
        "background-color": "white"
      }
    }))

    it('"element1","+"', () => expect(traverseTree({
      "element1": null,
      "+": [{
        "background-color": "white"
      }]
    })).toStrictEqual({
      "element1+*": {
        "background-color": "white"
      }
    }))      
  })

  describe("sibling `~`", () => {
    it('"element1","~","element2"', () => expect(traverseTree({
      "element1": null,
      "~": null,
      "element2": [{
        "background-color": "white"
      }]
    })).toStrictEqual({
      "element1~element2": {
        "background-color": "white"
      }
    }))
    it('"element1","~"', () => expect(traverseTree({
      "element1": null,
      "~": [{
        "background-color": "white"
      }]
    })).toStrictEqual({
      "element1~*": {
        "background-color": "white"
      }
    }))  
  })  

  describe("nesting", () => {
    it("child `>`", () => expect(traverseTree({
      "element1": {
        "element2": [{
          "background-color": "white"
        }]  
      },
    })).toStrictEqual({
      "element1>element2": {
        "background-color": "white"
      }
    }))

    it("descendant ` `", () => expect(traverseTree({
      "element1": {
        " ": {
          "element2": [{
            "background-color": "white"
          }]  
        }
      },
    })).toStrictEqual({
      "element1 element2": {
        "background-color": "white"
      }
    }))

    it("in descendant ` `", () => expect(traverseTree({
      "element": {
        " ": [{
          "background-color": "white"
        }]
      },
    })).toStrictEqual({
      "element *": {
        "background-color": "white"
      }
    }))
    
    it('"element","&.class"', () => expect(traverseTree({
      "element": {
        "&.class": [{
          "background-color": "white"
        }]
      },
    })).toStrictEqual({
      "element.class": {
        "background-color": "white"
      }
    }))

    it('"element","&postfix"', () => expect(traverseTree({
      "element": {
        "&postfix": [{
          "background-color": "white"
        }]
      },
    })).toStrictEqual({
      "elementpostfix": {
        "background-color": "white"
      }
    }))



    it('".class","&" ".class"', () => expect(traverseTree({
      "element": {
        "&.class": [{
          "background-color": "white"
        }]
      },
    })).toStrictEqual({
      "element.class": {
        "background-color": "white"
      }
    }))


  })
})

it('merge', () => expect(traverseTree({
  "el1": {
    "el2": [{
      "background-color": "black",
      "color": "red"
    }]
  },
  "el1>el2": [{
    "background-color": "white",
    "font-size": "16px"
  }]
})).toStrictEqual({
  "el1 > el2": {
    "color": "red",
    "background-color": "white",
    "font-size": "16px"
  }
}))

describe("tree 1 path", () => {
  it("+ by default", () => expect(traverseTree({
    "model": null,
    "viewer": null,
    "controller": [{
      "background-color": "white"
    }]
  })).toStrictEqual({
    "model+viewer+controller": {
      "background-color": "white"
    }
  }))
  it("~", () => expect(traverseTree({
    "el1": [],
    "~": null,
    "el2": [{
      "background-color": "white"
    }]
  })).toStrictEqual({
    "el1~el2": {
      "background-color": "white"
    }
  }))

  it("> by default", () => expect(traverseTree({
    "root": {
      "parent": {
        "child": [{
          "background-color": "white"
        }]
      }
    }
  })).toStrictEqual({
    "root>parent>child": {
      "background-color": "white"
    }
  }))

  it.skip("descendants", () => expect(traverseTree({
    "root": {
      " ": {
        "parent": {
          " ": {
            "child": [{
              "background-color": "white"
            }]
          }
        }
      }
    }
  })).toStrictEqual({
    "root>parent>child": {
      "background-color": "white"
    }
  }))
})

describe('with context', () => {
})
