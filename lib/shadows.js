module.exports = {
  rootVars (ssot) {
    const properties = {};
    const prop = {};
    properties['--bs-am-rgb'] = '0, 0, 0';
    properties['--op-ratio'] = `${ssot.shadows.opacityScaleRatio}`;
    properties['--bs-direction'] = '1';
    //
    prop['--bs-am-rgba'] = 'rgba(var(--bs-am-rgb), var(--bs-am-op-default))';
    properties['*'] = prop;
    //
    for (let i = 0; i < ssot.shadows.strength.list.length; i++) {
      const intensity = ssot.shadows.strength.list[i];
      if (i === 0) {
        properties[`--bs-am-op-${intensity.name}`] = `${ssot.shadows.strength.list[0].valueAmbient}`;
      }
      if (i > 0) {
        properties[`--bs-am-op-${intensity.name}`] = `calc(var(--bs-am-op-${
          ssot.shadows.strength.list[i - 1].name
        }) * var(--op-ratio))`;
      }
    }
    //
    properties['--bs-am-of-x'] = '0';
    properties['--bs-am-of-y'] = 'calc(4px * var(--bs-direction))';
    properties['--bs-am-blur'] = 'calc(12px * var(--bs-direction))';
    properties['--bs-am-spread'] = '0';
    properties['--bs-am-rgba'] = 'rgba(var( --bs-am-rgb ), var( --bs-am-op-default))';
    //

    return properties;
  },

  rules (ssot) {
    const props = {};
    const shadowDeclarationSelector = [];
    //
    ssot.shadows.sizes.list.forEach((size) => {
      shadowDeclarationSelector.push(`.shadow-${size.name}`);
    });
    //
    props[shadowDeclarationSelector] = {
      'box-shadow': `
			var(--bs-am-of-x) 
			var(--bs-am-of-y) 
			var(--bs-am-blur) 
			var(--bs-am-spread) 
			var(--bs-am-rgba)
			`
    };

    //

    ssot.shadows.strength.list.forEach((intensity) => {
      props[`.shadow-${intensity.name}`] = {
        '--bs-am-rgba': `rgba(var(--bs-am-rgb), var(--bs-am-op-${intensity.name}))`
      };
    });
    //
    ssot.shadows.sizes.list.forEach((size) => {
      props[`.shadow-${size.name}`] = {
        '--bs-am-of-y': `calc(${size.ambientLayer.offsetY} * var(--bs-direction))`,
        '--bs-am-blur': `${size.ambientLayer.blur}`
      };
    });

    return props;
  }
};
