const postcss = require('postcss');
const path = require('path');
const fs = require('fs-extra');

module.exports = () => {
  return function (css) {
    let file = path.relative(__dirname, css.source.input.file);
    file = file.replace(/\.\.\//g, '');
    file = file.replace(/\//g, '__');
    file = file.replace('scss', 'css');
    fs.ensureDir('./tmp');
    postcss([])
      .process(css, { from: undefined })
      .then((result) => {
        fs.writeFileSync(`./tmp/${file}`, result.css.toString(), function (err, result) {
          if (err) {
            console.log('error', err);
          }
        });
      });
  };
};

module.exports.postcss = true;
