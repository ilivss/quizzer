const { Router } = require('express');
const { Question } = require('./question.model');

const router = new Router();

/**
 * @swagger
 * /questions/{questionId}:
 *   get:
 *     description: Returns a question
 *     tags: [Questions]
 *     produces:
 *       - application/json
 *     parameters:
 *        - in: path
 *          name: questionId
 *          required: true
 *          schema:
 *            type: string
 *     responses:
 *       200:
 *         description: question
 *       404:
 *         description: not found
 */
router.get('/questions/:questionId', async (req, res, next) => {
  // TODO Parameter validation

  try {
    const { questionId } = req.params;

    const question = await Question.findById(questionId).exec();
    if (!question) return res.status(404).send('Question not found!');

    return res.json(question.toJSON());
  } catch (err) {
    return next(err);
  }
});

/**
 * @swagger
 * /questions/category/{categoryName}:
 *   get:
 *     description: Returns a list of questions of given category.
 *     tags: [Questions]
 *     produces:
 *       - application/json
 *     parameters:
 *        - in: path
 *          name: categoryName
 *          required: true
 *          schema:
 *            type: string
 *        - in: query
 *          name: page
 *          required: true
 *          schema:
 *            type: integer
 *        - in: query
 *          name: limit
 *          required: true
 *          schema:
 *            type: integer
 *     responses:
 *       200:
 *         description: questions
 *       404:
 *         description: not found
 */
router.get('/questions/category/:categoryName', async (req, res, next) => {
  // TODO: Parameter validation

  try {
    const { categoryName } = req.params;
    const { page: _page, limit: _limit } = req.query;

    // Pagination logic
    if ((_page && _page < 1) || (_limit && _limit < 1) || (_page && !_limit))
      return next({ code: 400, message: 'Invalid pagination parameters!' });

    const page = _page && _page > 0 ? parseInt(_page, 10) : undefined;
    const limit = _limit ? parseInt(_limit, 10) : undefined;
    const skip = page && limit ? (page - 1) * limit : 0;

    const questions = await Question.find({ category: categoryName })
      .skip(skip)
      .limit(limit)
      .exec();
    if (!questions || questions.length <= 0)
      return res.status(404).send('No questions found!');

    return res.json(questions.map((q) => q.toJSON()));
  } catch (err) {
    return next(err);
  }
});

module.exports = {
  questionsRouter: router,
};
