const router = require('express').Router();
const Task = require('../models/task.model');

router.route('/').get((req, res) => {
    Task.find()
        .then(tasks => res.json(tasks))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
    const username = req.body.username;
    const status = req.body.status;
    const priority = Number.parseInt(req.body.priority, 10);
    const comments = req.body.comments;
    const date = Date.parse(req.body.date);

    const newTask = new Task({
        username,
        status,
        priority,
        comments,
        date,
    });

    newTask.save()
        .then(() => res.json('Task added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update').put((req, res) => {
    Task.findByIdAndUpdate()
        .then(tasks => res.send('Task updated'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/del').delete((req, res) => {
    Task.findByIdAndDelete()
        .then(tasks => res.send('Task deleted'))
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;