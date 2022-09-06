const { Schema, model } = require('mongoose');
const { nanoid } = require('nanoid');

const quizSchema = new Schema({
  _id: {
    type: String,
    default: () => nanoid(6),
  },
});

const Quiz = model('Quiz', quizSchema);

module.exports = { Quiz };
