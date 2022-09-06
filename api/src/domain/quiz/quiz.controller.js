const { Router } = require('express');
const { Quiz } = require('./quiz.model');

const router = new Router();

/**
 * @swagger
 * /quizzes:
 *   post:
 *     description: Creates and returns a quiz
 *     tags: [Quizzes]
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: quiz
 *       404:
 *         description: not found
 */
router.post('/quizzes', async (req, res, next) => {
  try {
    const quiz = await Quiz.create({});
    if (!quiz) throw new Error('Quiz not created!');

    return res.status(201).json(quiz.toJSON());
  } catch (err) {
    return next(err);
  }
});

module.exports = {
  quizRouter: router,
};
