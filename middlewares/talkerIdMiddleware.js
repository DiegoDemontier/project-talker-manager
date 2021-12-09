const fs = require('fs').promises;

const HTTP_OK_STATUS = 200;
const HTTP_NOT_FOUND_STATUS = 404;

const talkerIdMiddleware = async (req, res) => {
  const data = await fs.readFile('./talker.json', 'utf-8');
  const parseData = await JSON.parse(data);

  const { id } = req.params;
  const talkerId = parseData.find((talker) => talker.id === Number(id));

  if (!talkerId) {
    return res.status(HTTP_NOT_FOUND_STATUS).json({
      message: 'Pessoa palestrante não encontrada',
    });
  }

  res.status(HTTP_OK_STATUS).json(talkerId);
};

module.exports = talkerIdMiddleware;