const {readFileSync} = require('fs');
const { resolve } = require("path");
const compileHTML = require('./compiler')

class MdToHtmlPlugin {
  constructor ({template , filename}) {
    if (!template ) {
      throw new Error('The config for "template" must be configured')
    }
    this.template = template;
    this.filename = filename || 'md.html';
  }
  // webpack 提供的方法 apply
  apply(compiler) {
    compiler.hooks.emit.tap('md-to-html-plugin', (compilation) => {
      const _assets = compilation.assets;
      console.log('===========assets===========');
      console.log(_assets);
      const _mdContent = readFileSync(this.template, 'utf8');
      console.log('===========mdContent===========');
      console.log(_mdContent);
      const _htmlStr = compileHTML(_mdContent);
      console.log('===========htmlStr===========');
      console.log(_htmlStr);
      const _templateHTML = readFileSync(resolve(__dirname, 'template.html'), 'utf8');
      console.log('===========templateHTML===========');
      console.log(_templateHTML);
      const _finalHTML = _templateHTML.replace('<!-- inner -->', _htmlStr);
      console.log('===========finalHTML===========');
      console.log(_finalHTML);
      _assets[this.filename] = {
        source() {
          return _finalHTML;
        },
        size() {
          return _finalHTML.length;
        }
      }
    })
  }
}
module.exports = MdToHtmlPlugin;