import express from "express";
import cors from "cors";
import notFound from "./app/middlewares/notFound";
import globalErrorHandler from "./app/middlewares/globalErrorHandler";
import router from "./app/routes";

const app = express();

// parsers
app.use(express.json());
app.use(cors());

app.use("/api", router);

app.get("/", (req, res) => {
  res.send({
    success: true,
    message: "server is running",
  });
});

app.use(notFound);
app.use(globalErrorHandler);

export default app;
