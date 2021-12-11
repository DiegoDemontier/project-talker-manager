const fs = require('fs').promises;

const HTTP_CREATED_STATUS = 201;
const HTTP_BAD_REQUEST_STATUS = 400;
const HTTP_UNAUTHORIZED_STATUS = 401;

const checkToken = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(HTTP_UNAUTHORIZED_STATUS).json(
      {
        message: 'Token não encontrado',
      },
    ); 
  }
  if (authorization.length !== 16) {
    return res.status(HTTP_UNAUTHORIZED_STATUS).json(
      {
        message: 'Token inválido',
      },
    );
  }
  next();
};

const checkName = (req, res, next) => {
  const { name } = req.body;
  if (!name) {
    return res.status(HTTP_BAD_REQUEST_STATUS).json(
      {
        message: 'O campo "name" é obrigatório',
      },
    ); 
  }
  if (name.length < 3) {
    return res.status(HTTP_BAD_REQUEST_STATUS).json(
      {
        message: 'O "name" deve ter pelo menos 3 caracteres',
      },
    );
  }
  next();
};

const checkAge = (req, res, next) => {
  const { age } = req.body;
  if (!age) {
    return res.status(HTTP_BAD_REQUEST_STATUS).json(
      {
        message: 'O campo "age" é obrigatório',
      },
    ); 
  }
  if (age < 18) {
    return res.status(HTTP_BAD_REQUEST_STATUS).json(
      {
        message: 'A pessoa palestrante deve ser maior de idade',
      },
    );
  }
  next();
};

const checkTalk = (req, res, next) => {
  const { talk } = req.body;

  if (!talk || !talk.watchedAt || (!talk.rate && talk.rate !== 0)) {
    return res.status(HTTP_BAD_REQUEST_STATUS).json(
      {
        message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios',
      },
    );
  }
  next();
};

const checkDate = (req, res, next) => {
  const { talk: { watchedAt } } = req.body;
  // REF: https://www.ti-enxame.com/pt/regex/regex-para-validar-o-formato-de-data-dd-mm-aaaa/1072768822/#:~:text=Eu%20preciso%20validar,012%5D)%5B%5C/%5C%2D%5D%5Cd%7B4%7D%24
  const dateRegex = /^(0?[1-9]|[12][0-9]|3[01])[/](0?[1-9]|1[012])[/]\d{4}$/;

  if (!dateRegex.test(watchedAt)) {
    return res.status(HTTP_BAD_REQUEST_STATUS).json(
      {
        message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"',
      },
    );
  }
  next();
};

const checkRate = (req, res, next) => {
  const { talk: { rate } } = req.body;

  if (!(Number.isInteger(rate) && rate > 0 && rate < 6)) {
    return res.status(HTTP_BAD_REQUEST_STATUS).json(
      {
        message: 'O campo "rate" deve ser um inteiro de 1 à 5',
      },
    );
  }
  next();
};

const addTalk = async (req, res) => {
  const data = await fs.readFile('./talker.json', 'utf-8');
  const parseData = await JSON.parse(data);
  parseData.push({
    id: parseData.length + 1,
    ...req.body,
  });
  await fs.writeFile('./talker.json', JSON.stringify(parseData));

  return res.status(HTTP_CREATED_STATUS).json(
    {
      id: parseData.length,
      ...req.body,
    },
  );
};

module.exports = {
  checkToken,
  checkName,
  checkAge,
  checkTalk,
  checkDate,
  checkRate,
  addTalk,
};