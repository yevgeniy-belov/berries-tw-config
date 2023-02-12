module.exports = {
  colorLightness(data) {
    const colors = {};
    const colorKeys = Object.keys(data);
    colorKeys.forEach((key) => {
      colors[`${key}`] = `hsla(var(--color-${key}-h), var(--color-${key}-s), var(--color-${key}-l-default), var(--opacity))`;
      Object.keys(data[key]).forEach((lightness) => {
        colors[`${key}-${lightness}`] = `hsla(var(--color-${key}-h), var(--color-${key}-s), var(--color-${key}-l-${lightness}), var(--opacity))`;
      });
    });
    return colors;
  },
  colorAlpha(data) {
    const colors = {};
    const colorKeys = Object.keys(data);
    colorKeys.forEach((key) => {
      colors[`${key}`] = `hsla(var(--color-${key}-h), var(--color-${key}-s), var(--color-${key}-l-default), var(--color-${key}-a-default))`;
      Object.keys(data[key].a).forEach((strength) => {
        colors[`${key}-${strength}`] = `hsla(var(--color-${key}-h), var(--color-${key}-s), var(--color-${key}-l-default), ${data[key].a[strength].value})`;
      });
    });
    return colors;
  },
  iconColors(data) {
    const colors = {};
    const colorKeys = Object.keys(data);
    colorKeys.forEach((key) => {
      colors[`${key}`] = `var(--color-${key}-default)`;
      Object.keys(data[key]).forEach((strength) => {
        const colorValue = {};
        colorValue['--icon-color'] = `hsla( var(--color-${key}-h),
        var(--color-${key}-s),
        calc( var(--color-${key}-l-${strength}) * var(--l-factor)), var(--color-fg-a))`;
        colors[`.icon-${key}-${strength}`] = colorValue;
        if (strength === 'default') {
          colors[`.icon-${key}`] = colorValue;
        }
      });
    });
    return colors;
  },

  bgColor(prefix, data) {
    const list = Object.keys(data);
    const colors = {};
    list.forEach((key) => {
      const colorItem = data[key];
      const colorValue = {};
      const selector = `.${prefix}-${key}`;
      colorValue['--opacity'] = `${colorItem.a?.value || 1}`;
      colorValue['--l-factor'] = '1';
      colorValue['background-color'] = `hsla( var(--color-${key}-h),
      var(--color-${key}-s),
      calc( var(--color-${key}-l) * var(--l-factor)), var(--opacity))`;
      colors[`${selector}`] = colorValue;
    });
    return colors;
  },

  blurs(data) {
    const colors = { '.backdrop-blur-0': { '--tw-backdrop-blur': 'blur(0)' } };
    Object.keys(data).forEach((blur) => {
      colors[`.backdrop-blur-${blur}`] = { '--tw-backdrop-blur': `blur(${data[blur]}px)` };
    });
    return colors;
  },

  strengths(prefix, list) {
    const colors = {};
    Object.keys(list).forEach((strength) => {
      colors[`.${prefix}-${strength}`] = { '--opacity': `${list[strength]}` };
    });
    return colors;
  },
};
