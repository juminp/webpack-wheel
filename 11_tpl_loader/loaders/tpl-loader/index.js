function tplLoader(source) {
  source = source.replace(/\s+/g, "");
  console.log("===========console===========");
  console.log(source);
  console.log("===========console===========");
  // return source;
  return `
    export default (options) => {
      ${tplReplace.toString()}
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
function tplReplace(template, replaceObject) {
  return template.replace(/\{\{(.*?)\}\}/g, (node, key) => {
    return replaceObject[key];
  });
}
