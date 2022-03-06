// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require("dotenv/config");

// ℹ️ Connects to the database
require("./db");

// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express
const express = require("express");

const app = express();

// ℹ️ This function is getting exported from the config folder. It runs most pieces of middleware
require("./config")(app);

const { isAuthenticated } = require('./middleware/jwt')

// 👇 Start handling routes here
// Contrary to the views version, all routes are controlled from the routes/index.js
// const allRoutes = require("./routes/index.routes");
// app.use("/api", allRoutes);

const authRouter = require("./routes/auth");
app.use("/auth", authRouter);

const profileRouter = require("./routes/profile");
app.use("/profile", isAuthenticated, profileRouter);

const tripRouter = require("./routes/trip");
app.use("/trips", isAuthenticated, tripRouter);

const couchRouter = require("./routes/couch");
app.use("/couches", isAuthenticated, couchRouter);

// const userRouter = require("./routes/")

// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require("./error-handling")(app);

module.exports = app;