import { iAttribute } from "./definitions";

export {
  attributeExpression2str
}

function attributeExpression2str(attrExpr: iAttribute){
  const {length} = attrExpr
  if (!length)
    return ''
    
  const attr = attrExpr[0]
  , comp = attrExpr[1]
  , val = attrExpr[2]

  return `[${
    attr
  }${
    comp ?? ''
  }${
    val === undefined ? '' : `"${val}"`
  }]`
}