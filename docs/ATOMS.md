# Atoms

## Table

### Input

- *json*

```json
[
    [null, "color", "background"],
    ["X", "red", "lightgrey"],
    ["Y", null, "red"],
    ["Z", "lightgrey", null]
]
```

* *md*

|      | color     | background |
| ---- | --------- | ---------- |
| X    | red       | lightgrey  |
| Y    |           | red        |
| Z    | lightgrey |            |

### Output

#### *classes.css*

Prefix SHOULD be in options - easiest way to support `.class`, `#id`, scss `&context`  and anything

```css
.X {
    color": red;
    background: lightgrey;
}
.Y {
    background: red;
}
.Z {
    color: lightgrey;
}
```

#### *mixins.scss*

```scss
@mixin X() {
    color: red;
    background: lightgrey;
    @content;
}
```

#### *mixins-extend.scss*

```scss
@import "classes";
@mixin X() {
    @extend &.X;
    @content;
}
```

#### *styleguide.md*

|      | Example                                                  | color     | background |
| ---- | -------------------------------------------------------- | --------- | ---------- |
| X    | <span style="color: red; background: lightgrey">X</span> | red       | lightgrey  |
| Y    | <span style="background: red">Y</span>                   |           | red        |
| Z    | <span style="color: lightgrey">Z</span>                  | lightgrey |            |
