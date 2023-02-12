module.exports = {
  generate (prefix, data, shades) {
    const colors = {};
    data.forEach((name) => {
      let color = `var(--bg-${name})`;
      colors[`${prefix}${name}`] = color;
      if (shades !== undefined) {
        shades.forEach((shade) => {
          const shadeName = shade !== 'default' ? `-${shade}` : '';
          color = `var(--color-${name}${shadeName})`;
          colors[`${prefix}${name}${shadeName}`] = color;
        });
      }
    });
    return colors;
  }
};
