import loggerModule from "morgan";
import express, { Express } from 'express';
import dotenv from 'dotenv';
import { aiRoutes } from "./routes/ai.routes.js"

dotenv.config();

// Routes
import { indexRoutes } from "./routes/index.routes.js";
import logger from "./config/logger.js";

const app: Express = express();
const port = process.env.PORT || 3000;

// Express configuration
app.set("port", port);
app.use(express.json());
app.use(loggerModule("dev"));

app.use("/", indexRoutes);
app.use("/ai/", aiRoutes)

// @ts-ignore don't need to type this
app.use((err, req, res, next) => {
    logger.error(err.message)
    logger.error(err.stack)
    res.status(err.statusCode || err.status || 500).send({
        error: err.message,
        stack: err.stack
    })
})

// app.get('/', (req: Request, res: Response) => {
//     res.send('Express + TypeScript Server twentytwo');
// });

app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});

export default app;
