import { getAllCookies } from "../utils/Cookie";

function domManipulation() {
  const cookie = getAllCookies();

  const link = document.getElementsByTagName("a");
  const code = document.getElementsByTagName("pre");
  const mark = document.getElementsByTagName("mark");
  const quote = document.getElementsByTagName("blockquote");

  for (var i = 0; i < link.length; i++) {
    if (cookie.theme === "dark") {
      link[i].style.color = "#9FAFFF";
    } else {
      link[i].style.color = "blue";
    }
  }

  for (let i = 0; i < code.length; i++) {
    code[i].style.borderRadius = "10px";
    if (cookie.theme === "dark") {
      code[i].style.background = "#353535";
    } else {
      code[i].style.background = "#eeeff2";
    }
  }

  for (let i = 0; i < quote.length; i++) {
    quote[i].style.paddingLeft = "32px";
    if (cookie.theme === "dark") {
      quote[i].style.borderLeft = "3px solid white";
    } else {
      quote[i].style.borderLeft = "3px solid black";
    }
  }

  for (let i = 0; i < mark.length; i++) {
    mark[i].style.background = "#fef08a";
  }
}

export default domManipulation;
