const Task = require("../models/taskModel");

exports.getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find();

    res.status(200).json({
      status: "success",
      data: {
        results: tasks.length,
        tasks,
      },
    });
  } catch (err) {
    console.error(err);
  }
};

exports.createTask = async (req, res) => {
  try {
    const newTask = await Task.create(req.body);

    res.status(201).json({
      status: "success",
      data: {
        task: newTask,
      },
    });
  } catch (err) {
    console.error(err);
  }
};

exports.updateTask = async (req, res) => {
  try {
    const updatedTask = await Task.findOneAndUpdate(
      {
        _id: req.params.id,
      },
      req.body,
      { new: true, runValidators: true }
    );

    res.status(200).json({
      status: "success",
      task: updatedTask 
    });
  } catch (err) {
    console.error(err);
  }
};

exports.deleteTask = async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);

    res.status(204).json({
      status: "success",
      data: {}
    });
  } catch (err) {
    console.error(err);
  }
};
