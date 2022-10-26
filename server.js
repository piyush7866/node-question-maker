const express = require("express");
const app = express();
const question_routes = require("./routes/question-route");
const authRoute = require("./routes/authRoutes");
const userRoute = require("./routes/userRoutes");
const connectDB = require("./db/connect");
require("dotenv").config();
const notFound = require("./middlewares/not-found");
const errorHandlerMiddleware = require("./middlewares/error-handler");

app.use(express.static("./public"));
app.use(express.json());

app.use("/api/v1/questions", question_routes);
app.use("/api/v1/user", userRoute);
app.use("/api/v1/auth", authRoute);
app.use(notFound);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => {
      console.log(`Server listening at port ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};
start();
