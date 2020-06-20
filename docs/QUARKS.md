# Quarks

## Processing

- *json*

```json
{
    "$opacity": 0.5,
    "$color": [{"rgba": [0, 0, 0, $opacity]}]
}
```

- *md*

See [*quarks-styleguide.md* example](#quarks-styleguide.md)

### Output options

#### *consts.scss*

```scss
& {
    $opacity: 0.5;
    $color: rgba(0, 0, 0, $opacity);
    $color: #{rgba(0, 0, 0, #{$opacity})};
}
```

#### *wrapper.scss*

```scss
& {
    $opacity: var(--opacity);
    $color: var(--color);
}
```

#### assign.scss

```scss
& {
    --opacity: 0.5;
    --color: rgba(0, 0, 0, $opacity); // or var(--opacity)    
}
```

#### *root.css*

```css
:root {
    --opacity: 0.5;
    --color: rgba(0, 0, 0, var(--opacity));
}
```

#### *root-evaled.css*

```css
:root {
    --opacity: 0.5;
    --color: rgba(0, 0, 0, 0.5);
}
```

#### *quarks-styleguide.md*

| Opacity consts | Value | Example                                  |
| -------------- | ----- | ---------------------------------------- |
| $opacity        | `0.5` | <span style="opacity:0.5">opacity</span> |

| Color consts | Value | Example                                  |
| -------------- | ----- | ---------------------------------------- |
| $color        | `rgba(0, 0, 0, 0.5)` | <span style="color: rgba(0, 0, 0, 0.5)">opacity</span> |

