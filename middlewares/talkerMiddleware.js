const fs = require('fs').promises;

const HTTP_OK_STATUS = 200;

const talkerMiddleware = async (req, res) => {
  const data = await fs.readFile('./talker.json', 'utf-8');
  const parseData = await JSON.parse(data);
  
  if (!parseData) return res.status(HTTP_OK_STATUS).json([]);

  res.status(HTTP_OK_STATUS).json(parseData);
};

module.exports = talkerMiddleware;