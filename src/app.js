const express = require("express");
const mongoose = require("mongoose");
const helmet = require("helmet");
const compression = require("compression");
const cors = require("cors");
const morgan = require("morgan");
const { connectDB } = require("./lib/config/mongoose.cofig");
const userRouter = require("./routes/user.routes");
require("dotenv").config();

const app = express();
connectDB();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(compression());
app.use(
  cors({
    origin: "*", // switch to client[s] origin
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
  })
);
app.set("trust proxy", true); // ?
app.set("query parser", (str) => {
  return qs.parse(str, {});
});

if (process.env.SERVER_ENV === "prod") {
  app.use(
    morgan(
      ":method :url :status :res[content-length] - :response-time ms :date[web]",
      { stream: null }
    )
  );
} else {
  app.use(morgan("dev"));
}

app.use("/users", userRouter);
app.get("/", (req, res) => {
  res.send({
    message: "WElcome to my express server",
  });
});

app.use(identifyError, handleError);

function identifyError(req, res, next) {
  const methods = req.method.match(/GET|POST|DELETE|PATCH?/gi);
  let err = {
    message: methods
      ? `Requested resource: ${req.url} Not Found`
      : `${req.method} is not implemented`,
  };
  err.status = 404;

  res.status(err.status || 400).json({
    error: {
      message: err.message,
      statusCode: err.status,
      redirect: true,
      to: `/`,
    },
  });
  next(err);
}

function handleError(err, req, res) {
  res.status(err.status || 500).json({
    error: {
      message: err.message || "endpoint not found",
      statusCode: err.status || 404,
      redirect: true,
      to: "/",
    },
  });
}

module.exports = { app };
