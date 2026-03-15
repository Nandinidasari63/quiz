export const fetchQuestions = async () => {
  const response = await fetch("/api/questions");
  return response.json();
}

export const submitAnswers = async (answers) => {
  const response = await fetch("/api/submit", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ answers })
  });
  return response.json();
}