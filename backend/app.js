const express = require('express');
const cors = require('cors');

const taskRouter = require('./routes/taskRoutes')

const app = express();


/*
  Middlewares
*/
app.use(express.json()); // To parse the json
app.use(cors()); // Allow all routes

/*
  Router mounting
*/
app.use('/api/v1/tasks', taskRouter)

module.exports = app;