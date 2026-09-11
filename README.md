# [Color Waves](https://git2358.github.io/Color-Waves/)

**Color Waves** is a simple browser-based colour palette generator for creating, exploring and exporting colour palettes, gradients, light variations and coloured shadows.

**Live demo:** [Color Waves](https://git2358.github.io/Color-Waves/)

## Features

Color Waves includes six palette generators.

### Monochromatic

Create light and dark variations from a single base colour.

- Choose a base colour
- Generate **3–50 colours**
- Create tonal scales for UI, themes and design systems

### 2 Colour Blend

Blend between two colours using different interpolation methods.

- Choose two colours
- Generate **2–50 colours**
- RGB, HSL, LAB or LCH interpolation

### 3 Colour Blend

Create a palette that passes through three chosen colours.

- Choose three colours
- Generate **3–50 colours**
- RGB, HSL, LAB or LCH interpolation

### 5 Colour Blend

Build a more complex colour progression using five colour stops.

- Choose five colours
- Generate **5–50 colours**
- RGB, HSL, LAB or LCH interpolation

### Light Cast

Create a light-to-shadow palette with a more natural colour transition.

You can control:

- Peak light
- Light influence
- Object colour
- Peak shadow
- Light influence strength
- Shadow influence strength
- Number of colours

Light Cast uses **LCH colour modelling** internally.

### Shadow Cast

Create coloured shadows while maintaining the character of the object's colour.

You can control:

- Peak light
- Object colour
- Shadow influence
- Peak shadow
- Shadow influence strength
- Light influence strength
- Number of colours

Shadow Cast also uses **LCH colour modelling** internally.

## Using Color Waves

1. Choose a generator.
2. Select your colours.
3. Adjust the number of colours.
4. Choose an interpolation method when available.
5. Click **Generate**.
6. Click **Randomise** to quickly create a new colour combination.

Generated palettes appear as interactive colour swatches.

Click any swatch to copy its HEX value.

Each swatch displays:

- HEX
- RGB
- HSL

## Export

Every generator includes four export options:

- **Copy HEX** — copies the palette as a list of HEX values.
- **Copy CSS** — copies the colours as CSS custom properties.
- **Copy JSON** — copies the palette as a JSON object.
- **Download** — downloads the palette as a `.txt` file.

### CSS

```css
--color-1: #ff0000;
--color-2: #cc0000;
--color-3: #990000;
```

### JSON
```json
{
  "colors": [
    "#ff0000",
    "#cc0000",
    "#990000"
  ]
}
```

### Downloads

Downloaded files use the generator name, for example:

```text
color-waves-mono.txt
color-waves-blend2.txt
color-waves-light.txt
```

## Colour Interpolation

The blend generators support four interpolation methods:

| Mode | Description |
| --- | --- |
| **RGB** | Direct interpolation between red, green and blue values |
| **HSL** | Interpolation using hue, saturation and lightness |
| **LAB** | Perceptual colour interpolation using CIELAB |
| **LCH** | Interpolation using lightness, chroma and hue |

LCH is also used internally by the **Light Cast** and **Shadow Cast** generators.

## How It Works

Color Waves runs entirely in the browser.

It uses:

- HTML
- CSS
- JavaScript

There is no server, database or build process required. Colour conversion, interpolation and palette generation all happen locally in your browser.

## Run Locally

Clone the repository:

```bash
git clone https://github.com/git2358/Color-Waves.git
cd Color-Waves
```

Then open `index.html` in a modern web browser.

You can also serve the directory with any simple local web server.

## Browser Support

Color Waves is designed for modern browsers using standard HTML, CSS and JavaScript APIs.

Clipboard features depend on browser clipboard support and permissions.

## Credits

Created by **2358**.

- [GitHub profile](https://github.com/git2358)
- [Color Waves repository](https://github.com/git2358/Color-Waves)
