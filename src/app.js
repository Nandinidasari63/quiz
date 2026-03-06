import { serveStatic } from "hono/deno"
import { logger } from "hono/logger"

const reqLogger = (app) => {
  app.use(logger())
}

const serveStaticPages = (app) => {
  app.get('*', serveStatic({ root: './public' }))
}

const serveIndexPage = (app) => {
  app.get('/',
    async (c) => {
      const Content = await Deno.readTextFile('./public/index.html');
      return c.html(Content)
    }
  )
}

export const registerRoutes = (app) => {
  reqLogger(app);
  serveStaticPages(app);
  serveIndexPage(app);
}
