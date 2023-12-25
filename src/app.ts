import express from "express";
import cors from "cors";
import {CategoryRoutes} from "./app/modules/Category/category.route";
import {CourseRoutes} from "./app/modules/Course/course.route";
import globalErrorHandler from "./app/middlewares/globalErrorHandler";
import notFound from "./app/middlewares/notFound";
import {ReviewRoutes} from "./app/modules/Review/review.route";

const app = express();

// parsers
app.use(express.json());
app.use(cors());

app.use("/api/", CourseRoutes);
app.use("/api/reviews", ReviewRoutes);
app.use("/api/categories", CategoryRoutes);

app.get("/", (req, res) => {
  res.send({
    success: true,
    message: "server is running",
  });
});

app.use(notFound);
app.use(globalErrorHandler);

export default app;
