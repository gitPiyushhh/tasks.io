const express = require("express");
const Task = require("../models/taskModel");
const taskController = require("./../controllers/tasksController");

const router = express.Router();

router
  .route("/")
  .get(taskController.getAllTasks)
  .post(taskController.createTask);

router
  .route("/:id")
  .patch(taskController.updateTask)
  .delete(taskController.deleteTask);

module.exports = router;
