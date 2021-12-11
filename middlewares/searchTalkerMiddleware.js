const fs = require('fs').promises;

const HTTP_OK_STATUS = 200;

const searchTalkerMiddleware = async (req, res) => {
  const data = await fs.readFile('./talker.json', 'utf-8');
  const parseData = await JSON.parse(data);

  const { q } = req.query;
  const talkerName = parseData.filter((talker) => talker.name.includes(q));

  if (!q) return res.status(HTTP_OK_STATUS).json(parseData);

  res.status(HTTP_OK_STATUS).json(talkerName);
};

module.exports = searchTalkerMiddleware;