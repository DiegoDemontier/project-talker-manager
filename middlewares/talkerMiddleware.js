const fs = require('fs').promises;

const talkerMiddleware = async (req, res) => {
  const data = await fs.readFile('./talker.json', 'utf-8');
  const parseData = await JSON.parse(data);
  
  if (!parseData) return res.status(200).json([]);

  res.status(200).json(parseData);
};

module.exports = talkerMiddleware;