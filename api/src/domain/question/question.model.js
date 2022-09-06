const { Schema, model } = require('mongoose');

const questionSchema = new Schema({
  question: {
    type: String,
    required: true,
  },
  answer: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
});

const Question = model('Question', questionSchema);

module.exports = {
  Question,
};
