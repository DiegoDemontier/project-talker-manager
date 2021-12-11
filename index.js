const express = require('express');
const bodyParser = require('body-parser');

const talkerMiddleware = require('./middlewares/talkerMiddleware');
const talkerIdMiddleware = require('./middlewares/talkerIdMiddleware');
const editTalkerMiddleware = require('./middlewares/editTalkerMiddleware');
const deleteTalkerMiddleware = require('./middlewares/deleteTalkerMiddleware');
const { checkEmail, checkPassword, returnToken } = require('./middlewares/loginMiddleware');
const { 
  checkToken,
  checkName,
  checkAge,
  checkTalk,
  checkDate,
  checkRate,
  addTalk,
 } = require('./middlewares/createTalkerMiddleware');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker', talkerMiddleware);

app.get('/talker/:id', talkerIdMiddleware);

app.post('/login', checkEmail, checkPassword, returnToken);

app.post('/talker',
  checkToken,
  checkName,
  checkAge,
  checkTalk,
  checkDate,
  checkRate,
  addTalk);

app.put('/talker/:id',
  checkToken,
  checkName,
  checkAge,
  checkTalk,
  checkDate,
  checkRate,
  editTalkerMiddleware);

app.delete('/talker/:id', checkToken, deleteTalkerMiddleware);

app.listen(PORT, () => {
  console.log('Online');
});
