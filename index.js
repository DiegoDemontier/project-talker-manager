const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker', (req, res) => {
  try {
    const data = fs.readFileSync('talker.json', 'utf8');
    if (JSON.parse(data).length === 0) {
      return res.status(HTTP_OK_STATUS).json('[]');
    } 
      return res.status(HTTP_OK_STATUS).json(JSON.parse(data));
  } catch (err) {
    console.log(err.message);
  }
});

app.listen(PORT, () => {
  console.log('Online');
});