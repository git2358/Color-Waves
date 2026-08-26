Color Waves

Color Waves is a browser-based colour palette generator for creating, exploring and exporting colour palettes, gradients, light variations and coloured shadows.

It is designed as a simple, self-contained tool for designers, developers, artists and anyone who needs to experiment with colour combinations.

🌐 Web App:
https://git2358.github.io/Color-Waves/

Features

Color Waves provides six different palette generation modes:

Monochromatic

Create a series of lighter and darker variations from a single base colour.

* Choose a base colour.
* Select between 3–50 colours.
* Generate a monochromatic scale.
* Useful for UI colour systems, themes and tonal palettes.

2 Colour Blend

Blend smoothly between two colours.

* Choose two colours.
* Select the interpolation method.
* Generate between 2–50 colours.

Available interpolation modes:

* RGB
* HSL
* LAB
* LCH

3 Colour Blend

Create a palette that passes through three selected colours.

This is useful for creating more complex gradients while controlling the midpoint of the transition.

5 Colour Blend

Create a more complex colour progression using five colour stops.

Five colours can be combined using RGB, HSL, LAB or LCH interpolation.

Light Cast

Create a light-to-shadow palette designed to produce more natural colour transitions.

Light Cast uses LCH colour modelling to introduce a light influence while maintaining the character of the object’s colour.

You can control:

* Peak light
* Light influence
* Object colour
* Peak shadow
* Light influence strength
* Shadow influence strength
* Number of generated colours

Shadow Cast

Create coloured shadows while maintaining the object’s hue and perceived lightness.

Instead of simply darkening or inverting a colour, Shadow Cast introduces a separate shadow colour influence using LCH colour modelling.

You can control:

* Peak light
* Object colour
* Shadow influence
* Peak shadow
* Shadow influence strength
* Light influence strength
* Number of generated colours

How to Use

1. Open Color Waves in your browser.
2. Choose the palette generator you want to use.
3. Select your colours using the colour pickers.
4. Adjust the number of generated colours.
5. For blend generators, choose an interpolation method.
6. Click Generate.
7. The generated palette will immediately appear below the controls.
8. Click any individual colour to copy its HEX value.

You can also click Randomise to automatically generate new colours and immediately preview the resulting palette.

Preview

Generated colours are displayed as interactive swatches.

Each swatch shows:

* HEX value
* RGB values
* HSL values

Clicking a swatch copies its HEX value to the clipboard.

Exporting Palettes

Every generator includes several export options.

Copy HEX

Copies the generated colours as a simple list of HEX values:

#FF0000
#CC0000
#990000
#660000

Copy CSS

Copies the palette as CSS custom properties:

--color-1: #ff0000;
--color-2: #cc0000;
--color-3: #990000;

These can be pasted directly into a CSS stylesheet.

Copy JSON

Copies the palette as JSON:

{
  "colors": [
    "#ff0000",
    "#cc0000",
    "#990000"
  ]
}

Download

Downloads the generated palette as a .txt file.

The filename includes the generator used, for example:

color-waves-mono.txt
color-waves-blend2.txt
color-waves-light.txt

Colour Interpolation

The blend generators support four interpolation modes.

RGB
Interpolates directly through red, green and blue values. This is simple and familiar but can sometimes produce less natural-looking transitions.

HSL
Interpolates using hue, saturation and lightness.

LAB
Uses the CIELAB colour space, which is designed to represent colour differences more perceptually than RGB.

LCH
Uses lightness, chroma and hue. LCH is particularly useful for creating controlled and visually natural colour transitions.

The Light Cast and Shadow Cast generators use LCH internally for their colour manipulation.

Technologies

Color Waves is a client-side web application built with:

* HTML
* CSS
* JavaScript
* chroma.js

No server or database is required.

All palette generation happens directly in your browser.

Running Locally

Because Color Waves is a static web application, it can be run locally without a build system.

Clone the repository:

git clone https://github.com/git2358/Color-Waves.git

Open the project directory:

cd Color-Waves

Then open the HTML file in a web browser.

Alternatively, serve the directory using any simple local web server.

Browser Support

Color Waves uses standard HTML, CSS and JavaScript APIs and should work in modern browsers.

Clipboard functionality requires browser permission and support for the Clipboard API.

Credits

Created by 2358.

GitHub:
https://github.com/git2358

Project:
https://github.com/git2358/Color-Waves

License

See the repository for licensing information.