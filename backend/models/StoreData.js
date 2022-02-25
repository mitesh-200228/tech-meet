const mongoose = require('mongoose');

const Grades = mongoose.Schema({
    userinfo: {
        type: Array,
        required: true,
    }
});

module.exports = mongoose.model('Grades', Grades);