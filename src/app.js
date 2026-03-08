import { serveStatic } from "hono/deno"
import { logger } from "hono/logger"

const reqLogger = (app) => {
  app.use(logger())
}

const serveStaticPages = (app) => {
  app.get('*', serveStatic({ root: './public' }))
}


const serveQuestions = (app) => {

  app.get("/api/questions", async (c) => {
    const data = await Deno.readTextFile("data/questions.json");
    return c.json(JSON.parse(data));
  });
}

const serveAnswersToBackend = (app) => {

  app.post("/api/submit", async (c) => {

    const body = await c.req.json();
    const userAnswers = body.answers;

    const data = await Deno.readTextFile("data/questions.json");
    const questions = JSON.parse(data);

    let score = 0;

    for (let i = 0; i < questions.length; i++) {
      if (questions[i].answer === userAnswers[i]) {
        score++;
      }
    }

    return c.json({
      score: score,
      total: questions.length
    });
  });

}

export const registerRoutes = (app) => {
  reqLogger(app);
  serveQuestions(app);
  serveAnswersToBackend(app)
  serveStaticPages(app);

}
