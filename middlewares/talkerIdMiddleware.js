const fs = require('fs').promises;

const talkerIdMiddleware = async (req, res) => {
  const data = await fs.readFile('./talker.json', 'utf-8');
  const parseData = await JSON.parse(data);

  const { id } = req.params;
  const talkerId = parseData.find((r) => r.id === Number(id));

  if (!talkerId) {
    return res.status(400).json({
      message: 'Pessoa palestrante não encontrada',
    });
  }

  res.status(200).json(talkerId);
};

module.exports = talkerIdMiddleware;