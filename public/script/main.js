import { startQuiz } from "./controller.js";


const main = () => {
  const section = document.querySelector("section");
  startQuiz(section);
};

window.onload = main;