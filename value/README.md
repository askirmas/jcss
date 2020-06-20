## $schema

*.*

*/*

*d*

*o*

*c*

*t*

*e*

*s*

*t*

*-*

*s*

*c*

*h*

*e*

*m*

*a*

*.*

*j*

*s*

*o*

*n*

## empties

### 0 DONE

```json
""
```

```css

```

### null DONE

```json
null
```

```css

```

### [] DONE

```json
[]
```

```css

```

### {} DONE

```json
{}
```

```css

```

## metric value

### number DONE

```json
0
```

```css
0
```

### string DONE

```json
"1px"
```

```css
1px
```

### [string] DONE

```json
["1px"]
```

```css
1px
```

### string|number[] DONE

```json
[1,"px"]
```

```css
1px
```

### string|number[][] WONT

```json
[[1],["px"]]
```

```css
1px
```

```css
1px
```

### string[] DONE

```json
["1","px"]
```

```css
1 px
```

## expression

### ordinary DONE

```json
[2,"+",2]
```

```css
2 + 2
```

### 1 DONE

```json
["2+",2]
```

```css
2+ 2
```

### 2 DONE

```json
[2,"+2"]
```

```css
2 +2
```

### prettify WONT

```json
"2+2"
```

```css
2 + 2
```

```css
2 + 2
```

## sequence

### string[] DONE

```json
["1px","solid","black"]
```

```css
1px solid black
```

### number[] DONE

```json
[1,2,3]
```

```css
1 2 3
```

## value mix#1 - sticking

### 1 DONE

```json
["1p","x"]
```

```css
1p x
```

### 2 DONE

```json
["1","px",1]
```

```css
1 px 1
```

### 3 DONE

```json
[1,1,"px"]
```

```css
1 1px
```

### 4 DONE

```json
[1,"px",1]
```

```css
1px 1
```

### 5 DONE

```json
[1,"1","px"]
```

```css
1 1 px
```

### 6 WONT

```json
["",1,"px",""]
```

```css
1px
```

```css
1px
```

## value mix#2

### border DONE

```json
["solid",1,"px","black"]
```

```css
solid 1px black
```

### border super mix DONE

```json
["solid",[1,"px"],{"hsla":[2,[50,"%"],"50",{"$opacity":0.5}]}]
```

```css
solid 1px hsla(2, 50%, 50, var(--opacity, 0.5))
```

## function as array

### 0 PROP

```json
["calc",2,"+",2]
```

```css
calc(2 + 2)
```

### calc brackets PROP

```json
["calc",[2,"+",2],"*",[2,"+",2]]
```

```css
calc((2 + 2) * (2 + 2))
```

## function as object

### Space separator DONE

```json
{"calc":[2,"+",2]}
```

```css
calc(2 + 2)
```

### Comma separator @ number[] DONE

```json
{"rgb":[0,0,0]}
```

```css
rgb(0, 0, 0)
```

### Comma separator @ string[] DONE

```json
[{"polygon":["50% 0%","0% 100%","100% 100%"]}]
```

```css
polygon(50% 0%, 0% 100%, 100% 100%)
```

```css
polygon(50% 0%, 0% 100%, 100% 100%)
```

### Mix separators @ number[] DONE

```json
[{"polygon":[["50%","0%"],["0%","100%"],["100%","100%"]]}]
```

```css
polygon(50% 0%, 0% 100%, 100% 100%)
```

```css
polygon(50% 0%, 0% 100%, 100% 100%)
```

### Mix separators @ mix[] DONE

```json
[{"polygon":[{"$point":["50%","0%"]},["0%","$x"],"100% 100%"]}]
```

```css
polygon(var(--point, 50% 0%), 0% var(--x), 100% 100%)
```

```css
polygon(var(--point, 50% 0%), 0% var(--x), 100% 100%)
```

## calc omit

### array PROP

```json
["calc",["calc",2,"+",2],"*",["calc",2,"+",2]]
```

```css
calc((2 + 2) * (2 + 2))
```

### object OPT

```json
[{"calc":[{"calc":[2,"+",2]},"*",[{"calc":[2,"+",2]}]]}]
```

```css
calc((2 + 2) * (2 + 2))
```

## nesting functions

### `rgb` is specific case WONT

```json
[{"rgb":[{"calc":[2,"+",2]},"*",[{"calc":[2,"+",2]}]]}]
```

```css
rgb(calc(2 + 2) * calc(2 + 2))
```

### 1 DONE

```json
[{"fn":[{"fn":[2,"+",2]},"*",[{"fn":[2,"+",2]}]]}]
```

```css
fn(fn(2 + 2) * fn(2 + 2))
```

## multi keys object

### border DONE

```json
[{"$width":[1,"px"],"$style":"solid","$color":"black"}]
```

```css
var(--width, 1px) var(--style, solid) var(--color, black)
```

```css
var(--width, 1px) var(--style, solid) var(--color, black)
```

## variable

### 0 DONE

```json
"$var"
```

```css
var(--var)
```

### bash-like OPT

```json
"${var}"
```

```css
var(--var)
```

### SASS escape OPT

```json
"$var"
```

```css
#{$var}
```

### SASS escaped OPT

```json
"#{$var}"
```

```css
var(--var)
```

## variable with SASS target

### As is for SASS PROP

```json
"$var"
```

```css
$var
```

### SASS escaped PROP

```json
"$var"
```

```css
#{$var}
```

*Sass snippet https://sass-lang.com/documentation/modules/meta#variable-exists*

## variable with default as object

### 0 DONE

```json
[{"$var":"0px"}]
```

```css
var(--var, 0px)
```

### 1 DONE

```json
[{"$var":[0,"px"]}]
```

```css
var(--var, 0px)
```

### 2 DONE

```json
[{"$v1":{"$v2":[0,"px"]}}]
```

```css
var(--v1, var(--v2, 0px))
```

## variable with default in string

### bash-like WONT

```json
"${var:=0px}"
```

```css
var(--var, 0px)
```

### 1 WONT

```json
"${var, 0px}"
```

```css
var(--var, 0px)
```

## variable with default as array

### in case of only 2 items PROP

```json
["$var","0px"]
```

```css
var(--var, 0px)
```

### 1 PROP

```json
["$var",":=","0px"]
```

```css
var(--var, 0px)
```

## variable and function

### Arguments length MAY be processed UNST

```json
[{"rgb":[{"$color":{"hsl":[2,2,2,"$opacity"]}}]}]
```

```css
rgb(var(--color, hsl(2, 2, 2, var(--opacity))))
```

### `hsla` with variable example DONE

```json
[{"rgb":[{"$color":{"hsla":[2,2,2,"$opacity"]}}]}]
```

```css
rgb(var(--color, hsla(2, 2, 2, var(--opacity))))
```

## custom function

### 0 DONE

```json
[{"@sum":[1,2,3]}]
```

```css
@sum(1, 2, 3)
```

```css
@sum(1, 2, 3)
```
