export const fetchQuestions = async (c) => {
  const data = await Deno.readTextFile("data/questions.json");
  return c.json(JSON.parse(data));
};

export const submitQuiz = async (c) => {
  const body = await c.req.json();
  const userAnswers = body.answers;
  const data = await Deno.readTextFile("data/questions.json");
  const questions = JSON.parse(data);
  console.log(questions, userAnswers);
  const score = questions.filter((question, index) => {
    return question.answer === userAnswers[index];
  })
    .length;

  return c.json({
    score: score,
    total: questions.length,
  });
};
