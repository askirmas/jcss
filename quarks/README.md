## Processing

```json
{
    "$opacity": 0.5,
    "$color": [{"rgba": [0, 0, 0, $opacity]}]
}
```

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

