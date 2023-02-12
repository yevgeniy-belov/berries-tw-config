module.exports = {
  rules(prefix, strengths) {
    const props = {};
    Object.keys(strengths).forEach((strength) => {
      props[`.${prefix}-${strength}`] = {
        color: `hsla(var(--color-fg-h), var(--color-fg-s), var(--color-fg-l-default), ${strengths[strength]})`
      };
    });
    return props;
  }
};
