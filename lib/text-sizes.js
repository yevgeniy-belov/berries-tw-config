module.exports = {
  rules (data) {
    const props = {};
    const keys = Object.keys(data.text);

    keys.forEach((key) => {
      props[`.text-${key}`] = {
        'font-size': `var(--text-${key})`
      };
    });

    return props;
  }
};
