import { startQuiz } from "./controller.js";

const main = () => {
  const mainNode = document.querySelector("main");
  startQuiz(mainNode);
};

window.onload = main;
