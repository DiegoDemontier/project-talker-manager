const express = require('express');

const deleteTalkerMiddleware = require('./middlewares/deleteTalkerMiddleware');
const editTalkerMiddleware = require('./middlewares/editTalkerMiddleware');
const searchTalkerMiddleware = require('./middlewares/searchTalkerMiddleware');
const talkerIdMiddleware = require('./middlewares/talkerIdMiddleware');
const talkerMiddleware = require('./middlewares/talkerMiddleware');
const { 
  checkToken,
  checkName,
  checkAge,
  checkTalk,
  checkDate,
  checkRate,
  addTalk,
  } = require('./middlewares/createTalkerMiddleware');

const talkerRouter = express.Router();

talkerRouter.get('/', talkerMiddleware);

talkerRouter.get('/search', checkToken, searchTalkerMiddleware);

talkerRouter.get('/:id', talkerIdMiddleware);

talkerRouter.post('/',
  checkToken,
  checkName,
  checkAge,
  checkTalk,
  checkDate,
  checkRate,
  addTalk);

talkerRouter.put('/:id',
  checkToken,
  checkName,
  checkAge,
  checkTalk,
  checkDate,
  checkRate,
  editTalkerMiddleware);

talkerRouter.delete('/:id', checkToken, deleteTalkerMiddleware);

module.exports = talkerRouter;