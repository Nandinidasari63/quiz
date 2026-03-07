export const fetchQuestions = async () => {
  const response = await fetch("/script/questions.json");
  return response.json();
}