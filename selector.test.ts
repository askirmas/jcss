import {} from "./definitions"

describe.skip('object', () => {
  describe("", () => {
    it("+ by default", () => expect({
      "model": null,
      "viewer": {},
      "controller": [{
        "background-color": "white"
      }]
    }).toStrictEqual({
      "model+viewer+controller": {
        "background-color": "white"
      }
    }))
    it("> by default", () => expect({
      "root": {
        "parent": {
          "child": [{
            "background-color": "white"
          }]
        }
      }
    }).toStrictEqual({
      "root>parent>child": {
        "background-color": "white"
      }
    }))
    it("complex", () => expect({
      "body": {
        "div": {},
        "~": {
          "": [{}],
          " ": [{}]
        },
        "section": [{}],
        " ": {
          "main":[{}]
        },
        "$ ": {
          "main":[{}]
        }

      }
    }).toStrictEqual({
      "body>div": {},
      "body>div~*": {},
      "body>div~section": {},
      "body>div~section+* main": {},
      "body main": {},
    }))
  })
  describe('with context', () => {
    it("bem", () => expect({
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
    }).toStrictEqual({
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
  })
})