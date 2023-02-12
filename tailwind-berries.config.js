const plugin = require('tailwindcss/plugin');
const mainColors = require('./tokens/src/elements/colors/main.json');
const bgStrengths = require('./tokens/src/elements/colors/bg-strengths.json');
const blur = require('./tokens/src/elements/blur.json');
const layoutColors = require('./tokens/src/elements/colors/layout.json');
const stateColors = require('./tokens/src/elements/colors/state.json');
const engraveColors = require('./tokens/src/elements/foregrounds/engrave.json');
const txtSizes = require('./tokens/src/elements/typography/size.json');
const fgStrengths = require('./tokens/src/elements/foregrounds/fg-strengths.json');
const breakpoints = require('./tokens/src/elements/breakpoints.json');
const SSOT = require('./SSOT.json');
const bgColors = require('./lib/colors');
const fgColor = require('./lib/fg-color');
const corePlugs = require('./lib/core-plugs');
const borders = require('./lib/borders');
const textSizes = require('./lib/text-sizes');
const flexbox = require('./lib/flexbox');
const shadows = require('./lib/shadows');
module.exports = {
  theme: {
    screens: {
      xs: breakpoints.breakpoint.xs.value,
      sm: breakpoints.breakpoint.sm.value,
      md: breakpoints.breakpoint.md.value,
      lg: breakpoints.breakpoint.lg.value,
      xl: breakpoints.breakpoint.xl.value,
      xxl: breakpoints.breakpoint.xxl.value,
    },
    extend: {
      gridTemplateColumns: {
        16: 'repeat(16, minmax(0, 1fr))'
      },
      gridColumn: {
        'span-13': 'span 13 / span 13',
        'span-14': 'span 14 / span 14',
        'span-15': 'span 15 / span 15',
        'span-16': 'span 16 / span 16',
      },
      spacing: {
        '0': 0,
        '1': '1px',
        '2': '2px',
        '3': '3px',
        '4': '4px',
        '5': '6px',
        '6': '9px',
        '7': '14px',
        '8': '20px',
        '9': '30px',
        '10': '45px',
        '11': '68px',
        '12': '100px',
        '13': '150px',
        '14': '225px',
        '15': '338px'
      }
    },
    container: {
      center: true,
    },
    colors: {
      ...bgColors.colorLightness(mainColors.color),
      ...bgColors.colorAlpha(engraveColors.color)
    },
  },
  corePlugins: corePlugs,
  plugins: [
    // eslint-disable-next-line func-names
    require('@tailwindcss/line-clamp'),
    plugin(function ({ addUtilities, addVariant }) {
      addVariant('container-xs', '.container-xs &');
      /*
      -------------------------------------------------------------------------------
      The order below matters - it matches the order of the generated CSS content!
      -------------------------------------------------------------------------------
      */
      addUtilities({
        '.text-block.text-2xs:before': { 'margin-top': '-5px' },
        '.text-block.text-2xs:after': { 'margin-bottom': '-5px' },
        '.text-block.text-xs:before': { 'margin-top': '-5px' },
        '.text-block.text-xs:after': { 'margin-bottom': '-5px' },
        '.text-block.text-sm:before': { 'margin-top': '-6px' },
        '.text-block.text-sm:after': { 'margin-bottom': '-5px' },
        '.text-block.text-md:before': { 'margin-top': '-6px' },
        '.text-block.text-md:after': { 'margin-bottom': '-6px' },
        '.text-block.text-lg:before': { 'margin-top': '-7px' },
        '.text-block.text-lg:after': { 'margin-bottom': '-6px' },
        '.text-block.text-xl:before': { 'margin-top': '-8px' },
        '.text-block.text-xl:after': { 'margin-bottom': '-8px' },
        '.text-block.text-2xl:before': { 'margin-top': '-11px' },
        '.text-block.text-2xl:after': { 'margin-bottom': '-10px' },
        '.text-block.text-3xl:before': { 'margin-top': '-16px' },
        '.text-block.text-3xl:after': { 'margin-bottom': '-14px' },
        '.text-block.text-4xl:before': { 'margin-top': '-20px' },
        '.text-block.text-4xl:after': { 'margin-bottom': '-18px' },
        '.text-block.text-5xl:before': { 'margin-top': '-28px' },
        '.text-block.text-5xl:after': { 'margin-bottom': '-24px' },
        //
        ...{ '.fg-primary-weakest': { 'background-color': 'var(--color-fg-primary-weakest)' } },
        ...{ '.fg-primary-weak': { 'background-color': 'var(--color-fg-primary-weak)' } },
        ...{ '.fg-primary, .fg-primary-default': { 'background-color': 'var(--color-fg-primary-default)' } },
        ...{ '.fg-primary-strong': { 'background-color': 'var(--color-fg-primary-strong)' } },
        // 
        ...{ '.fg-weakest': { 'background-color': 'var(--color-fg-weakest)' } },
        ...{ '.fg-weak': { 'background-color': 'var(--color-fg-weak)' } },
        ...{ '.fg, .fg-default': { 'background-color': 'var(--color-fg-default)' } },
        ...{ '.fg-strong': { 'background-color': 'var(--color-fg-strong)' } },
        //
        ':where(.theme)':{
          ...shadows.rootVars(SSOT),
        },
          ...shadows.rules(SSOT),
          ...bgColors.bgColor('bg', layoutColors.color), // Must come before any modifiers.
          ...bgColors.bgColor('bg', stateColors.color), // Must come before any modifiers.
          ...textSizes.rules(txtSizes),
          ...borders.rules(SSOT),
          ...flexbox.rules(),
          ...bgColors.strengths('bg', bgStrengths['bg-strength']), // Must come after lightness.
          ...bgColors.blurs(blur),
          ...fgColor.rules('text', fgStrengths['fg-strength']),
        // 
      });
    })
  ]
};
