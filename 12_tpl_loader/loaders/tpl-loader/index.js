const { tplReplace } = require("./utils");
const { getOptions } = require("loader-utils");

function tplLoader(source) {
  source = source.replace(/\s+/g, "");
  const { log } = getOptions(this);
  console.log("===========console===========");
  console.log(getOptions(this));
  console.log(log);
  console.log("===========console===========");

  const _log = log
    ? `console.warn('compiled the file which is from ${this.resourcePath}')`
    : "";

  return `
    export default (options) => {
      ${tplReplace.toString()}
      ${_log.toString()}
      return tplReplace('${source}', options)
    }
  `;
}
module.exports = tplLoader;

// template:
// <div><h1>{{name}}</h1><p>{{gender}}</p><p>{{career}}</p><p>{{hobby}}</p><p>{{phrase}}</p></div>

// replaceObject:
// {
//   name: "Hélodie Jacqueline",
//   gender: "male",
//   career: "Quality inspector",
//   hobby: "female",
//   phrase: "Relex ! You gays .",
// }

// function tplReplace(template, replaceObject) {
//   return template.replace(/\{\{(.*?)\}\}/g, (node, key) => {
//     return replaceObject[key];
//   });
// }
