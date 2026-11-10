const { randomUUID } = require("crypto");

let tasks = [];

class Task {
  static getAll() {
    return tasks;
  }

  static getById(id) {
    return tasks.find((task) => task.id === id);
  }

  static create(taskData) {
    const newTask = {
      id: randomUUID(),
      title: taskData.title,
      description: taskData.description || "",
      completed: false,
      createdAt: new Date().toISOString(),
    };

    tasks.push(newTask);

    return newTask;
  }

  static update(id, taskData) {
    const taskIndex = tasks.findIndex((task) => task.id === id);

    if (taskIndex === -1) {
      return null;
    }

    tasks[taskIndex] = {
      ...tasks[taskIndex],
      ...taskData,
      id: tasks[taskIndex].id,
      createdAt: tasks[taskIndex].createdAt,
    };

    return tasks[taskIndex];
  }

  static delete(id) {
    const taskIndex = tasks.findIndex((task) => task.id === id);

    if (taskIndex === -1) {
      return null;
    }

    const deletedTask = tasks[taskIndex];

    tasks.splice(taskIndex, 1);

    return deletedTask;
  }
}

module.exports = Task;