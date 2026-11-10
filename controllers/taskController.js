const Task = require("../models/taskModel");

// GET /api/tasks
const getAllTasks = (req, res) => {
  const tasks = Task.getAll();

  res.status(200).json({
    success: true,
    count: tasks.length,
    data: tasks,
  });
};

// GET /api/tasks/:id
const getTaskById = (req, res) => {
  const task = Task.getById(req.params.id);

  if (!task) {
    return res.status(404).json({
      success: false,
      message: "Task not found",
    });
  }

  res.status(200).json({
    success: true,
    data: task,
  });
};

// POST /api/tasks
const createTask = (req, res) => {
  const { title, description } = req.body;

  if (!title || typeof title !== "string" || !title.trim()) {
    return res.status(400).json({
      success: false,
      message: "A valid task title is required",
    });
  }

  const newTask = Task.create({
    title: title.trim(),
    description:
      typeof description === "string" ? description.trim() : "",
  });

  res.status(201).json({
    success: true,
    message: "Task created successfully",
    data: newTask,
  });
};

// PATCH /api/tasks/:id
const updateTask = (req, res) => {
  const { title, description, completed } = req.body;

  if (Object.keys(req.body).length === 0) {
    return res.status(400).json({
      success: false,
      message: "Please provide at least one field to update",
    });
  }

  if (
    title !== undefined &&
    (typeof title !== "string" || !title.trim())
  ) {
    return res.status(400).json({
      success: false,
      message: "Title must be a non-empty string",
    });
  }

  if (
    description !== undefined &&
    typeof description !== "string"
  ) {
    return res.status(400).json({
      success: false,
      message: "Description must be a string",
    });
  }

  if (
    completed !== undefined &&
    typeof completed !== "boolean"
  ) {
    return res.status(400).json({
      success: false,
      message: "Completed must be a boolean",
    });
  }

  const updatedData = {};

  if (title !== undefined) updatedData.title = title.trim();
  if (description !== undefined) {
    updatedData.description = description.trim();
  }
  if (completed !== undefined) {
    updatedData.completed = completed;
  }

  const updatedTask = Task.update(req.params.id, updatedData);

  if (!updatedTask) {
    return res.status(404).json({
      success: false,
      message: "Task not found",
    });
  }

  res.status(200).json({
    success: true,
    message: "Task updated successfully",
    data: updatedTask,
  });
};

// DELETE /api/tasks/:id
const deleteTask = (req, res) => {
  const deletedTask = Task.delete(req.params.id);

  if (!deletedTask) {
    return res.status(404).json({
      success: false,
      message: "Task not found",
    });
  }

  res.status(200).json({
    success: true,
    message: "Task deleted successfully",
    data: deletedTask,
  });
};

module.exports = {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
};