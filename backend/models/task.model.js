const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const taskSchema = new Schema({
    name: { type: String, required: true},
    status: { type: String, required: true },
    priority: { type: Number, required: true },
    comments: {type: String, required: true },
    date: {type: Date, required: true },
}, {
    timestamps: true,
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;