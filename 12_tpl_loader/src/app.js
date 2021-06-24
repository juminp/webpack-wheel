console.log("welcome loader");
const elementApp = document.getElementById("app");
import tpl from "./info.tpl";
const info = {
  name: "Hélodie Jacqueline",
  gender: "male",
  career: "Quality inspector",
  hobby: "female",
  phrase: "Relex ! You gays .",
};

console.log(tpl(info));
elementApp.innerHTML = tpl(info);
