const mongoose = require('mongoose');
const fs = require('fs/promises');
const path = require('path');
const { Question } = require('../domain/question/question.model');

const print = (string, object = '') => {
  // eslint-disable-next-line no-console
  if (process.env.NODE_ENV !== 'test') console.log(string, object);
};

exports.seedQuestions = async () => {
  print(`\nSeeding database with Questions`);

  // Drop collection
  print('\tStep 1: Deleting existing questions...');
  try {
    await Question.collection.drop();
    print('\t\tok!');
  } catch (err) {
    print('\t\terror!', err.message);
  }

  // Read questions from disk
  print('\tStep 2: Reading questions from disk...');
  let data = [];
  try {
    const file = await fs.readFile(
      path.join('src', 'utils', 'questions_en.json'),
      'utf-8'
    );
    data = JSON.parse(file);
    print('\t\tok!');
  } catch (err) {
    print('\t\terror!', err.message);
    return 1;
  }

  // Map file data to Questions
  print('\tStep 3: Mapping file data to question documents...');
  const questions = data.map(
    ({ question, answer, category }) =>
      new Question({ question, answer, category })
  );
  print('\t\tok!');

  // Save all docs
  print(`\tStep 4: Saving all question documents to database...`);
  try {
    await Question.insertMany(questions);
    print('\t\tok!');
  } catch (err) {
    if (err.code === 11000) {
      print('\t\terror! question already exists!'); // MongoDB Duplicate key error
    } else {
      print('\t\terror! saving questions:', err);
    }
  }

  return 0;
};

exports.main = async () => {
  // Connect to MongoDB
  print('\nConnecting to MongoDB...');
  await mongoose.connect(
    process.env.MONGO_URI,
    { useNewUrlParser: true, useUnifiedTopology: true },
    (err) => {
      if (err) throw new Error('Could not connect to MongoDB!');
    }
  );
  print('ok!');

  // Seed database
  await this.seedQuestions();

  process.exit(0);
};
