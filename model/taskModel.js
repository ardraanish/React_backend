const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    date: { type: Date, required: true },
    isDeleted: { type: Boolean, default: false },
    // assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    status: { type: String, required: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
},{
    timestamps:true
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
