const express = require('express');
const taskModel = require('../model/task');

const taskRoute = express.Router();

// Read all tasks
taskRoute.get('/', async (req, res) => {
    try {
        // Fetch all tasks from the database
        const tasks = await taskModel.find({});

        // Send the tasks with success status
        res.status(200).send(tasks);
    } catch (err) {
        // Log and send error if something goes wrong
        console.error(err);
        res.status(500).send(err);
    }
});


// Read a particular task
taskRoute.get('/:id', async (req, res) => {
    // Read task id from request params
    const taskId = req.params.id;
    console.log("Get task with ID: ", taskId);
    
    // Fetch a particular task by id from database
    try {
        const task = await taskModel.findById(taskId);
        res.status(200).send({
            message: 'Task fetched successfully',
            data: task
        });
    } catch (err){
        // Log and send error if something goes wrong
        console.error(err);
        res.status(500).send(err);
    }
})

// create tasks
taskRoute.post('/', async (req, res) => {
    // Read task data from request body
    const task = await req.body;
    console.log(task);

    try{

        // Create a new task in the database
        const newTask = await taskModel.create(task)
        console.log("New Task Created: ", newTask);

        // Send the created task with success status
        res.status(201).send({
            message: 'Task created successfully',
            data: newTask
        });
    } catch(err){
        // Log and send error if something goes wrong
        console.error(err);
        res.status(400).send(err);
    }
})

// Update tasks
taskRoute.put('/:id', async (req, res) => {
    const taskId = req.params.id;
    const updatedData = await req.body;
    console.log("Update task with ID: ", taskId);

    // Update a particular task by id in database
    try {
        const updatedTask = await taskModel.findByIdAndUpdate(taskId, updatedData, {new: true});
        console.log("Updated Task: ", updatedTask);
        res.status(200).send({
            message: 'Task updated successfully',
            data: updatedTask
        })
    } catch (err){
        // Log and send error if something goes wrong
        console.error(err);
        res.status(400).send(err);
    }
})

// Delete tasks
taskRoute.delete('/:id', async (req, res) => {
    const taskId = req.params.id;
    console.log("Delete task with ID: ", taskId);

    // Delete a particular task by id in database
    try {
        const deletedTask = await taskModel.findByIdAndDelete(taskId);
        console.log("Deleted Task: ", deletedTask);
        res.status(200).send({
            message: 'Task deleted successfully',
            data: deletedTask
        })
    } catch (err){
        // Log and send error if something goes wrong
        console.error(err);
        res.status(400).send(err);
    }
})

module.exports = taskRoute;