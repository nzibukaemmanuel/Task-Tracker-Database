require("dotenv").config();

const express = require("express");

const config = require("./config/config");

const Task = require("./models/taskModel");
const taskRoutes = require("./routes/taskRoutes");

const notFoundMiddleware = require("./middleware/notFoundMiddleware");
const errorMiddleware = require("./middleware/errorMiddleware");

const app = express();

// Built-in middleware
app.use(express.json());

// Welcome route
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Welcome to the RESTful Task Tracker API",
  });
});

// Health check: status, uptime (seconds) and number of tasks
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "ok",
    uptime: Math.round(process.uptime()),
    environment: config.environment,
    taskCount: Task.getAll().length,
    timestamp: new Date().toISOString(),
  });
});

// Task routes
app.use("/api/tasks", taskRoutes);

// Error handling middleware
app.use(notFoundMiddleware);
app.use(errorMiddleware);

module.exports = app;
