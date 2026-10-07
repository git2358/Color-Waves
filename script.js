(() => {

"use strict";


/* =====================================================
   STATE / HELPERS
===================================================== */

const palettes = {};

const $ = id =>
  document.getElementById(id);

const value = id =>
  $(id).value;


function clamp(value, min, max) {
  return Math.min(
    max,
    Math.max(min, value)
  );
}


function lerp(a, b, t) {
  return a + (b - a) * t;
}


function randomHex() {

  return "#" +
    Math.floor(
      Math.random() * 0xffffff
    )
    .toString(16)
    .padStart(6, "0");

}


/* =====================================================
   HEX / RGB
===================================================== */

function parseHex(hex) {

  hex = String(hex)
    .trim()
    .replace("#", "");

  if (hex.length === 3) {

    hex =
      hex[0] + hex[0] +
      hex[1] + hex[1] +
      hex[2] + hex[2];

  }

  if (!/^[0-9a-fA-F]{6}$/.test(hex)) {
    throw new Error(
      "Invalid HEX colour: " + hex
    );
  }

  return {
    r: parseInt(hex.substring(0, 2), 16),
    g: parseInt(hex.substring(2, 4), 16),
    b: parseInt(hex.substring(4, 6), 16)
  };

}


function rgbToHex(r, g, b) {

  return "#" +
    [r, g, b]
      .map(v =>
        Math.round(
          clamp(v, 0, 255)
        )
        .toString(16)
        .padStart(2, "0")
      )
      .join("");

}


function hexToRgb(hex) {

  const c = parseHex(hex);

  return [
    c.r,
    c.g,
    c.b
  ];

}


function rgbMix(a, b, t) {

  return [
    lerp(a[0], b[0], t),
    lerp(a[1], b[1], t),
    lerp(a[2], b[2], t)
  ];

}


/* =====================================================
   HSL
===================================================== */

function rgbToHsl(rgb) {

  let r = rgb[0] / 255;
  let g = rgb[1] / 255;
  let b = rgb[2] / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);

  let h = 0;
  let s = 0;

  const l = (max + min) / 2;

  if (max !== min) {

    const d = max - min;

    s =
      l > .5
        ? d / (2 - max - min)
        : d / (max + min);

    switch (max) {

      case r:
        h =
          (g - b) / d +
          (g < b ? 6 : 0);
        break;

      case g:
        h =
          (b - r) / d + 2;
        break;

      case b:
        h =
          (r - g) / d + 4;
        break;

    }

    h /= 6;

  }

  return [
    h * 360,
    s,
    l
  ];

}


function hue2rgb(p, q, t) {

  if (t < 0) t += 1;
  if (t > 1) t -= 1;

  if (t < 1 / 6) {
    return p +
      (q - p) * 6 * t;
  }

  if (t < 1 / 2) {
    return q;
  }

  if (t < 2 / 3) {
    return p +
      (q - p) *
      (2 / 3 - t) * 6;
  }

  return p;

}


function hslToRgb(hsl) {

  let h = hsl[0] / 360;

  const s = hsl[1];
  const l = hsl[2];

  let r;
  let g;
  let b;

  if (s === 0) {

    r = g = b = l;

  } else {

    const q =
      l < .5
        ? l * (1 + s)
        : l + s - l * s;

    const p =
      2 * l - q;

    r =
      hue2rgb(
        p,
        q,
        h + 1 / 3
      );

    g =
      hue2rgb(
        p,
        q,
        h
      );

    b =
      hue2rgb(
        p,
        q,
        h - 1 / 3
      );

  }

  return [
    r * 255,
    g * 255,
    b * 255
  ];

}


/* =====================================================
   RGB -> XYZ
===================================================== */

function rgbToXyz(rgb) {

  let r = rgb[0] / 255;
  let g = rgb[1] / 255;
  let b = rgb[2] / 255;

  r =
    r > .04045
      ? Math.pow(
          (r + .055) / 1.055,
          2.4
        )
      : r / 12.92;

  g =
    g > .04045
      ? Math.pow(
          (g + .055) / 1.055,
          2.4
        )
      : g / 12.92;

  b =
    b > .04045
      ? Math.pow(
          (b + .055) / 1.055,
          2.4
        )
      : b / 12.92;

  return [

    (
      r * .4124564 +
      g * .3575761 +
      b * .1804375
    ) * 100,

    (
      r * .2126729 +
      g * .7151522 +
      b * .0721750
    ) * 100,

    (
      r * .0193339 +
      g * .1191920 +
      b * .9503041
    ) * 100

  ];

}


/* =====================================================
   XYZ -> RGB
===================================================== */

function xyzToRgb(xyz) {

  let x = xyz[0] / 100;
  let y = xyz[1] / 100;
  let z = xyz[2] / 100;

  let r =
    x * 3.2404542 +
    y * -1.5371385 +
    z * -0.4985314;

  let g =
    x * -.9692660 +
    y * 1.8760108 +
    z * .0415560;

  let b =
    x * .0556434 +
    y * -.2040259 +
    z * 1.0572252;

  r =
    r > .0031308
      ? 1.055 *
        Math.pow(r, 1 / 2.4) -
        .055
      : 12.92 * r;

  g =
    g > .0031308
      ? 1.055 *
        Math.pow(g, 1 / 2.4) -
        .055
      : 12.92 * g;

  b =
    b > .0031308
      ? 1.055 *
        Math.pow(b, 1 / 2.4) -
        .055
      : 12.92 * b;

  return [

    clamp(r * 255, 0, 255),
    clamp(g * 255, 0, 255),
    clamp(b * 255, 0, 255)

  ];

}


/* =====================================================
   LAB
===================================================== */

function xyzToLab(xyz) {

  const refX = 95.047;
  const refY = 100.000;
  const refZ = 108.883;

  let x = xyz[0] / refX;
  let y = xyz[1] / refY;
  let z = xyz[2] / refZ;

  const f = n =>
    n > .008856
      ? Math.cbrt(n)
      : 7.787 * n + 16 / 116;

  x = f(x);
  y = f(y);
  z = f(z);

  return [

    116 * y - 16,

    500 * (x - y),

    200 * (y - z)

  ];

}


function labToXyz(lab) {

  const refX = 95.047;
  const refY = 100.000;
  const refZ = 108.883;

  const fy =
    (lab[0] + 16) / 116;

  const fx =
    lab[1] / 500 + fy;

  const fz =
    fy - lab[2] / 200;

  const finv = n => {

    const n3 = n * n * n;

    return n3 > .008856
      ? n3
      : (n - 16 / 116) / 7.787;

  };

  return [

    refX * finv(fx),
    refY * finv(fy),
    refZ * finv(fz)

  ];

}


function rgbToLab(rgb) {

  return xyzToLab(
    rgbToXyz(rgb)
  );

}


function labToRgb(lab) {

  return xyzToRgb(
    labToXyz(lab)
  );

}


/* =====================================================
   LAB <-> LCH
===================================================== */

function labToLch(lab) {

  const L = lab[0];
  const a = lab[1];
  const b = lab[2];

  const C =
    Math.sqrt(
      a * a + b * b
    );

  let H =
    Math.atan2(b, a) *
    180 /
    Math.PI;

  if (H < 0) H += 360;

  return [
    L,
    C,
    H
  ];

}


function lchToLab(lch) {

  const L = lch[0];
  const C = lch[1];

  const H =
    lch[2] *
    Math.PI /
    180;

  return [

    L,

    C * Math.cos(H),

    C * Math.sin(H)

  ];

}


function rgbToLch(rgb) {

  return labToLch(
    rgbToLab(rgb)
  );

}


function lchToRgb(lch) {

  return labToRgb(
    lchToLab(lch)
  );

}


/* =====================================================
   COLOUR INTERPOLATION
===================================================== */

function interpolateHsl(a, b, t) {

  const A = rgbToHsl(a);
  const B = rgbToHsl(b);

  let h1 = A[0];
  let h2 = B[0];

  let dh = h2 - h1;

  if (dh > 180) dh -= 360;
  if (dh < -180) dh += 360;

  let h = h1 + dh * t;

  if (h < 0) h += 360;
  if (h >= 360) h -= 360;

  return hslToRgb([

    h,

    lerp(A[1], B[1], t),

    lerp(A[2], B[2], t)

  ]);

}


function interpolateLab(a, b, t) {

  const A = rgbToLab(a);
  const B = rgbToLab(b);

  return labToRgb([

    lerp(A[0], B[0], t),
    lerp(A[1], B[1], t),
    lerp(A[2], B[2], t)

  ]);

}


function interpolateLch(a, b, t) {

  const A = rgbToLch(a);
  const B = rgbToLch(b);

  let h1 = A[2];
  let h2 = B[2];

  let dh = h2 - h1;

  if (dh > 180) dh -= 360;
  if (dh < -180) dh += 360;

  let h = h1 + dh * t;

  if (h < 0) h += 360;
  if (h >= 360) h -= 360;

  return lchToRgb([

    lerp(A[0], B[0], t),

    lerp(A[1], B[1], t),

    h

  ]);

}


function interpolate(a, b, t, mode) {

  if (mode === "hsl") {
    return interpolateHsl(a, b, t);
  }

  if (mode === "lab") {
    return interpolateLab(a, b, t);
  }

  if (mode === "lch") {
    return interpolateLch(a, b, t);
  }

  return rgbMix(a, b, t);

}


/* =====================================================
   MULTI-STOP SCALE
===================================================== */

function generateScale(
  colors,
  count,
  mode
) {

  const stops =
    colors.map(hex =>
      hexToRgb(hex)
    );

  const result = [];

  const n =
    Math.max(
      2,
      Number(count)
    );

  for (let i = 0; i < n; i++) {

    const position =
      i / (n - 1);

    const scaled =
      position *
      (stops.length - 1);

    const index =
      Math.min(
        stops.length - 2,
        Math.floor(scaled)
      );

    const localT =
      scaled - index;

    const rgb =
      interpolate(
        stops[index],
        stops[index + 1],
        localT,
        mode
      );

    result.push(
      rgbToHex(
        rgb[0],
        rgb[1],
        rgb[2]
      )
    );

  }

  return result;

}


/* =====================================================
   LCH INFLUENCE
===================================================== */

function influencedLch(
  objectHex,
  influenceHex,
  amount,
  lightnessDelta = 0
) {

  const object =
    rgbToLch(
      hexToRgb(objectHex)
    );

  const influence =
    rgbToLch(
      hexToRgb(influenceHex)
    );

  const t =
    clamp(amount, 0, 1);

  let hue;

  if (
    !Number.isFinite(object[2]) &&
    Number.isFinite(influence[2])
  ) {

    hue = influence[2];

  } else {

    hue =
      object[2] +
      (
        influence[2] -
        object[2]
      ) * t;

  }

  const l =
    clamp(
      object[0] +
      lightnessDelta,
      0,
      100
    );

  const c =
    clamp(
      object[1] * (1 - t) +
      influence[1] * t,
      0,
      150
    );

  if (!Number.isFinite(hue)) {
    hue = object[2];
  }

  return lchToRgb([
    l,
    c,
    hue
  ]);

}


/* =====================================================
   PREVIEW / SWATCHES
===================================================== */

function createSwatches(
  mode,
  colors
) {

  palettes[mode] =
    colors.map(color =>
      String(color).toLowerCase()
    );

  const output =
    $("palette-" + mode);

  output.innerHTML = "";

  palettes[mode].forEach(hex => {

    const rgb =
      hexToRgb(hex);

    const hsl =
      rgbToHsl(rgb);

    const swatch =
      document.createElement(
        "button"
      );

    swatch.type =
      "button";

    swatch.className =
      "swatch";

    swatch.style.backgroundColor =
      hex;

    swatch.setAttribute(
      "aria-label",
      `Copy ${hex}`
    );

    const hue =
      Number.isFinite(hsl[0])
        ? Math.round(hsl[0])
        : 0;

    const saturation =
      Math.round(
        hsl[1] * 100
      );

    const lightness =
      Math.round(
        hsl[2] * 100
      );

    swatch.innerHTML = `

      <span class="swatch-info">

        <strong>
          ${hex.toUpperCase()}
        </strong>

        <span>
          RGB
          ${Math.round(rgb[0])},
          ${Math.round(rgb[1])},
          ${Math.round(rgb[2])}
        </span>

        <span>
          ${hue}° ·
          ${saturation}% ·
          ${lightness}%
        </span>

      </span>

    `;

    /*
     * IMPORTANT:
     *
     * Do not make this click handler async.
     *
     * The fallback clipboard operation must happen
     * synchronously while the browser still considers
     * the click a user gesture.
     */

    swatch.addEventListener(
      "click",
      () => {

        const copied =
          copyText(
            hex,
            mode,
            "Copied " +
            hex.toUpperCase()
          );

        if (copied) {

          swatch.classList.add(
            "copied"
          );

          setTimeout(() => {

            swatch.classList.remove(
              "copied"
            );

          }, 500);

        }

      }
    );

    output.appendChild(
      swatch
    );

  });

}


/* =====================================================
   STATUS
===================================================== */

function setStatus(
  mode,
  message
) {

  const status =
    $("status-" + mode);

  status.textContent =
    message;

  if (!setStatus.timers) {
    setStatus.timers = {};
  }

  clearTimeout(
    setStatus.timers[mode]
  );

  setStatus.timers[mode] =
    setTimeout(() => {

      status.textContent = "";

    }, 2200);

}


/* =====================================================
   CLIPBOARD
===================================================== */

/*
 * Clipboard strategy:
 *
 * 1. First try document.execCommand("copy")
 *    synchronously.
 *
 *    This is important because it runs while the
 *    browser still has the original button click's
 *    user-activation state.
 *
 * 2. If that fails, try navigator.clipboard.
 *
 * This avoids the common problem where awaiting
 * navigator.clipboard causes the subsequent fallback
 * to lose user activation.
 */

function copyText(
  text,
  mode,
  message = "Copied"
) {

  if (
    !text ||
    !String(text).trim()
  ) {

    setStatus(
      mode,
      "Generate a palette first."
    );

    return false;

  }

  text =
    String(text);

  /*
   * Synchronous fallback FIRST.
   */

  if (
    fallbackCopy(text)
  ) {

    setStatus(
      mode,
      message
    );

    return true;

  }

  /*
   * Modern Clipboard API SECOND.
   *
   * This may be asynchronous, but it is only reached
   * if the synchronous method was unavailable/failed.
   */

  if (
    navigator.clipboard &&
    typeof navigator.clipboard.writeText ===
      "function"
  ) {

    navigator.clipboard
      .writeText(text)
      .then(() => {

        setStatus(
          mode,
          message
        );

      })
      .catch(error => {

        console.error(
          "Clipboard API failed:",
          error
        );

        setStatus(
          mode,
          "Copy failed — please copy manually."
        );

      });

    /*
     * The operation has been handed to the browser.
     * Return true here so the swatch can show immediate
     * feedback.
     */

    return true;

  }

  setStatus(
    mode,
    "Copy failed — please copy manually."
  );

  return false;

}


function fallbackCopy(text) {

  const textarea =
    document.createElement(
      "textarea"
    );

  textarea.value =
    text;

  textarea.setAttribute(
    "readonly",
    ""
  );

  /*
   * Do NOT put the textarea at -9999px.
   *
   * Safari/iOS can reject copy operations when the
   * selected element is completely outside the viewport.
   */

  textarea.style.position =
    "fixed";

  textarea.style.top =
    "0";

  textarea.style.left =
    "0";

  textarea.style.width =
    "2px";

  textarea.style.height =
    "2px";

  textarea.style.padding =
    "0";

  textarea.style.margin =
    "0";

  textarea.style.border =
    "0";

  textarea.style.opacity =
    "0";

  textarea.style.background =
    "transparent";

  textarea.style.pointerEvents =
    "none";

  textarea.style.zIndex =
    "-1";

  document.body.appendChild(
    textarea
  );

  let successful =
    false;

  try {

    textarea.focus({
      preventScroll: true
    });

    textarea.select();

    textarea.setSelectionRange(
      0,
      textarea.value.length
    );

    successful =
      document.execCommand(
        "copy"
      );

  } catch (error) {

    console.warn(
      "Synchronous clipboard fallback failed:",
      error
    );

  }

  textarea.remove();

  return successful;

}


/* =====================================================
   EXPORT FORMATS
===================================================== */

function cssVariables(colors) {

  return colors
    .map(
      (color, i) =>
        `--color-${i + 1}: ${color};`
    )
    .join("\n");

}


function jsonPalette(colors) {

  return JSON.stringify(
    {
      colors
    },
    null,
    2
  );

}


/* =====================================================
   GENERATORS
===================================================== */

function generateMono() {

  const base =
    hexToRgb(
      value("mono-color")
    );

  const count =
    Number(
      value("mono-steps")
    );

  const midpoint =
    Math.floor(
      count / 2
    );

  const baseLch =
    rgbToLch(base);

  const colors =
    Array.from(
      { length: count },
      (_, i) => {

        const delta =
          i - midpoint;

        const lightness =
          clamp(
            baseLch[0] -
            delta * 8,
            0,
            100
          );

        const rgb =
          lchToRgb([
            lightness,
            baseLch[1],
            baseLch[2]
          ]);

        return rgbToHex(
          rgb[0],
          rgb[1],
          rgb[2]
        );

      }
    );

  createSwatches(
    "mono",
    colors
  );

}


function generateBlend(
  mode,
  numberOfColors
) {

  const colors =
    Array.from(
      {
        length:
          numberOfColors
      },
      (_, i) =>
        value(
          `${mode}-${i + 1}`
        )
    );

  const result =
    generateScale(
      colors,
      value(`${mode}-steps`),
      value(`${mode}-mode`)
    );

  createSwatches(
    mode,
    result
  );

}


function generateLight() {

  const peakLight =
    value("light-1");

  const lightInfluence =
    value("light-2");

  const object =
    value("light-3");

  const peakShadow =
    value("light-5");

  const lightAmount =
    Number(
      value("light-strength")
    ) / 100;

  const shadowAmount =
    Number(
      value(
        "light-shadow-strength"
      )
    ) / 100;

  const count =
    Number(
      value("light-steps")
    );

  const lightSide =
    rgbToHex(
      ...influencedLch(
        object,
        lightInfluence,
        lightAmount,
        20 * lightAmount
      )
    );

  const shadowBase =
    rgbToHex(
      ...influencedLch(
        object,
        lightInfluence,
        shadowAmount * .45,
        -15 * shadowAmount
      )
    );

  const shadowSide =
    rgbToHex(
      ...interpolate(
        hexToRgb(shadowBase),
        hexToRgb(peakShadow),
        shadowAmount,
        "lch"
      )
    );

  const colors =
    generateScale(
      [
        peakLight,
        lightSide,
        object,
        shadowSide,
        peakShadow
      ],
      count,
      "lch"
    );

  createSwatches(
    "light",
    colors
  );

}


function generateShadow() {

  const peakLight =
    value("shadow-1");

  const object =
    value("shadow-3");

  const shadowInfluence =
    value("shadow-4");

  const peakShadow =
    value("shadow-5");

  const shadowAmount =
    Number(
      value("shadow-strength")
    ) / 100;

  const lightAmount =
    Number(
      value(
        "shadow-light-strength"
      )
    ) / 100;

  const count =
    Number(
      value("shadow-steps")
    );

  const lightSide =
    rgbToHex(
      ...influencedLch(
        object,
        peakLight,
        lightAmount,
        20 * lightAmount
      )
    );

  const colouredShadow =
    rgbToHex(
      ...influencedLch(
        object,
        shadowInfluence,
        shadowAmount,
        -25 * shadowAmount
      )
    );

  const shadowSide =
    rgbToHex(
      ...interpolate(
        hexToRgb(colouredShadow),
        hexToRgb(peakShadow),
        shadowAmount,
        "lch"
      )
    );

  const colors =
    generateScale(
      [
        peakLight,
        lightSide,
        object,
        shadowSide,
        peakShadow
      ],
      count,
      "lch"
    );

  createSwatches(
    "shadow",
    colors
  );

}


/* =====================================================
   GENERATOR ROUTER
===================================================== */

function generate(mode) {

  try {

    if (mode === "mono") {
      generateMono();
    }

    if (mode === "blend2") {
      generateBlend("blend2", 2);
    }

    if (mode === "blend3") {
      generateBlend("blend3", 3);
    }

    if (mode === "blend5") {
      generateBlend("blend5", 5);
    }

    if (mode === "light") {
      generateLight();
    }

    if (mode === "shadow") {
      generateShadow();
    }

  } catch (error) {

    console.error(
      `Color Waves ${mode} error:`,
      error
    );

    setStatus(
      mode,
      "Unable to generate palette."
    );

  }

}


/* =====================================================
   RANDOMISE
===================================================== */

function randomise(mode) {

  if (mode === "mono") {

    $("mono-color").value =
      randomHex();

  }

  if (mode === "blend2") {

    $("blend2-1").value =
      randomHex();

    $("blend2-2").value =
      randomHex();

  }

  if (mode === "blend3") {

    for (
      let i = 1;
      i <= 3;
      i++
    ) {

      $(`blend3-${i}`).value =
        randomHex();

    }

  }

  if (mode === "blend5") {

    for (
      let i = 1;
      i <= 5;
      i++
    ) {

      $(`blend5-${i}`).value =
        randomHex();

    }

  }

  if (mode === "light") {

    $("light-1").value =
      "#ffffff";

    $("light-2").value =
      randomHex();

    $("light-3").value =
      randomHex();

    $("light-5").value =
      "#000000";

  }

  if (mode === "shadow") {

    $("shadow-1").value =
      "#ffffff";

    $("shadow-3").value =
      randomHex();

    $("shadow-4").value =
      randomHex();

    $("shadow-5").value =
      "#000000";

  }

  generate(mode);

}


/* =====================================================
   DOWNLOAD
===================================================== */

function download(mode) {

  const colors =
    palettes[mode] || [];

  if (!colors.length) {

    setStatus(
      mode,
      "Generate a palette first."
    );

    return;

  }

  const text =
    colors.join("\n");

  const blob =
    new Blob(
      [text],
      {
        type:
          "text/plain;charset=utf-8"
      }
    );

  const url =
    URL.createObjectURL(
      blob
    );

  const link =
    document.createElement(
      "a"
    );

  link.href =
    url;

  link.download =
    `color-waves-${mode}.txt`;

  link.style.display =
    "none";

  document.body.appendChild(
    link
  );

  link.click();

  link.remove();

  setTimeout(() => {

    URL.revokeObjectURL(
      url
    );

  }, 100);

  setStatus(
    mode,
    "Palette downloaded."
  );

}


/* =====================================================
   RANGE INPUTS
===================================================== */

document
  .querySelectorAll(
    'input[type="range"]'
  )
  .forEach(range => {

    const output =
      $(range.id + "-value");

    range.addEventListener(
      "input",
      () => {

        if (
          range.id.includes(
            "strength"
          )
        ) {

          output.textContent =
            range.value + "%";

        } else {

          output.textContent =
            range.value;

        }

      }
    );

  });


/* =====================================================
   GENERATE BUTTONS
===================================================== */

document
  .querySelectorAll(
    "[data-generate]"
  )
  .forEach(button => {

    button.addEventListener(
      "click",
      () => {

        generate(
          button.dataset.generate
        );

      }
    );

  });


/* =====================================================
   RANDOM BUTTONS
===================================================== */

document
  .querySelectorAll(
    "[data-random]"
  )
  .forEach(button => {

    button.addEventListener(
      "click",
      () => {

        randomise(
          button.dataset.random
        );

      }
    );

  });


/* =====================================================
   COPY HEX
===================================================== */

document
  .querySelectorAll(
    "[data-copy]"
  )
  .forEach(button => {

    button.addEventListener(
      "click",
      () => {

        const mode =
          button.dataset.copy;

        const colors =
          palettes[mode] || [];

        copyText(
          colors.join("\n"),
          mode,
          "HEX palette copied."
        );

      }
    );

  });


/* =====================================================
   COPY CSS
===================================================== */

document
  .querySelectorAll(
    "[data-css]"
  )
  .forEach(button => {

    button.addEventListener(
      "click",
      () => {

        const mode =
          button.dataset.css;

        const colors =
          palettes[mode] || [];

        copyText(
          cssVariables(colors),
          mode,
          "CSS variables copied."
        );

      }
    );

  });


/* =====================================================
   COPY JSON
===================================================== */

document
  .querySelectorAll(
    "[data-json]"
  )
  .forEach(button => {

    button.addEventListener(
      "click",
      () => {

        const mode =
          button.dataset.json;

        const colors =
          palettes[mode] || [];

        copyText(
          jsonPalette(colors),
          mode,
          "JSON copied."
        );

      }
    );

  });


/* =====================================================
   DOWNLOAD BUTTONS
===================================================== */

document
  .querySelectorAll(
    "[data-download]"
  )
  .forEach(button => {

    button.addEventListener(
      "click",
      () => {

        download(
          button.dataset.download
        );

      }
    );

  });


/* =====================================================
   INITIAL PREVIEWS
===================================================== */

[
  "mono",
  "blend2",
  "blend3",
  "blend5",
  "light",
  "shadow"
]
.forEach(generate);


})();