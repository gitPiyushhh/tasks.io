const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  title: {
    type: "String",
    required: [true, "A task must have a title"],
  },
  description: String,
  priority: {
    type: String,
    enum: ["Low", "Medium", "High"],
    default: "Low",
  },
  status: {
    type: String,
    enum: ["Pending", "In Progress", "Completed"],
    default: "Pending",
  },
  dueDate: {
    type: Date,
    default: Date.now(),
  },
});

const Task = mongoose.model("Task", schema);

module.exports = Task;
