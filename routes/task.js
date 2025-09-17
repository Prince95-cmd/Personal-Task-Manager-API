const express = require('express');
const taskModel = require('../model/task');

const taskRoute = express.Router();

/**
 * @swagger
 * tags:
 *   name: Tasks
 *   description: Task management
 */

/** 
 * @swagger
 *  Components:
 *    Schemas:
 *      Tasks:
 *        type: object
 *        properties:
 *          _id:
 *            type: string
 *            description: The auto-generated id of the task
 *          title:
 *            type: string
 *          description:
 *            type: string
 *          duration:
 *            type: string
 *          status:
 *            type: string
 *          date:
 *            type: string
 *          startTime:
 *            type: string
 *          endTime:
 *            type: string
 */

/**
 * @swagger
 * /tasks:
 *   get:
 *     summary: Get all tasks
 *     tags: [Tasks]
 *     security:
 *       - ApiKeyAuth: []
 *     responses:
 *       200:
 *         description: Task fetched successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/Components/Schemas/Task'
 *       401:
 *         description: Unauthorized
 *       500:
 *        description: Server error
 */

// Get all tasks
taskRoute.get('/', async (req, res) => {
    try {
        // Fetch all tasks from the database
        const tasks = await taskModel.find({});

        // Send the tasks with success status
        res.status(200).send({
            message : 'Tasks fetched successfully',
            data : tasks
        });
    } catch (err) {
        // Log and send error if something goes wrong
        console.error(err);
        res.status(401).send({
            message : 'Unauthorized',
            err
        })
        res.status(500).send({
            message : 'Server error',
            err
        });
    }
});


/**
 * @swagger
 * /tasks/{id}:
 *   get:
 *     summary: Get a task by ID
 *     tags: [Tasks]
 *     security:
 *       - ApiKeyAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The task ID
 *     responses:
 *       200:
 *         description: Task fetched successfully
 *       404:
 *         description: Task not found
 *       500:
 *         description: Server error
 */

// Get a task by ID
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
        res.status(404).send({
            message: 'Task not found',
            err
        });
        res.status(500).send({
            message: 'Server error',
            err
        });
    }
})


/**
 * @swagger
 * /tasks:
 *   post:
 *     summary: Create a new task
 *     tags: [Tasks]
 *     security:
 *       - ApiKeyAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       201:
 *         description: Task created successfully
 *       400:
 *        description: Bad Request
 */

// create a new task
taskRoute.post('/', async (req, res) => {
    // Read task data from request body
    const task = req.body;
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
        res.status(400).send({
            message: 'Bad Request',
            err
        });
    }
})


/**
 * @swagger
 * /tasks/{id}:
 *   put:
 *     summary: Update a task
 *     tags: [Tasks]
 *     security:
 *       - ApiKeyAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The task ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       200:
 *         description: Task updated successfully
 *       400:
 *         description: Bad Request
 */

// Update a tasks
taskRoute.put('/:id', async (req, res) => {
    const taskId = req.params.id;
    const updatedData = req.body;
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
        res.status(400).send({
            message: 'Bad Request',
            err
        });
    }
})


/**
 * @swagger
 * /tasks/{id}:
 *   delete:
 *     summary: Delete a task
 *     tags: [Tasks]
 *     security:
 *       - ApiKeyAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The task ID
 *     responses:
 *       200:
 *         description: Task deleted successfully
 *       400:
 *         description: Bad Request
 */

// Delete a task
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
        res.status(400).send({
            message: 'Bad Request',
            err
        });
    }
})

module.exports = taskRoute;