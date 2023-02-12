module.exports = {
  scaleVars (name, data) {
    const colors = {};
    const range = data.properties.lightnessRange || 100;
    const h = data.properties.hs[0];
    const s = data.properties.hs[1];
    const { amount } = data.properties;
    for (let i = 0; i < amount; i++) {
      const step = i;
      const colorValue = {};
      const propertyName = `--${name}-${step + 1}-${amount}`;
      colorValue['--opacity'] = '1';
      colorValue['background-color'] = `
			hsla( ${h},${s},
				${range - (range / amount) * step}%,
				1)`;
      colors[`${propertyName}`] = `hsla( ${h}, ${s}, calc(var(--${name}-lightness) - ${
        (range / (amount + 1)) * step
      }% * var(--sign)), 1)`;
    }
    return colors;
  },

  scaleColors (name, data) {
    const colors = {};
    const { amount } = data.properties;
    for (let i = 0; i < amount; i++) {
      const step = i + 1;
      const rule = {};
      const selector = `.${name}-${step}-${amount}`;
      rule['background-color'] = `var(--${name}-${step}-${amount})`;
      colors[`${selector}`] = rule;
    }
    return colors;
  }
};
