// 1. coofiguration
const express = require("express");
const bodyParser = require("body-parser");

// 4. import router
const jobsRoutes = require("./routes/job-routes");
const HttpError = require("./models/http-error");
const app = express();

// encode request body to json data
app.use(bodyParser.json());

// 2. midleware setup
app.use("/api/jobs", jobsRoutes);

// error handling
// - for unspported routes
app.use((req, res, next) => {
  const error = new HttpError("Could not find this route.", 404);
  throw error;
});

// - for each routes
app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || "An unknown error occured!" });
});

// 3. listen PORT
app.listen(5000);
