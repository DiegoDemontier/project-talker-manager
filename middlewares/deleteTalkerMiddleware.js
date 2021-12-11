const fs = require('fs').promises;

const HTTP_OK_STATUS = 200;

const deleteTalkerMiddleware = async (req, res) => {
  const data = await fs.readFile('./talker.json', 'utf-8');
  const parseData = await JSON.parse(data);

  const { id } = req.params;

  const index = parseData.findIndex((talker) => talker.id === Number(id));
  parseData.splice(index, 1);

  await fs.writeFile('./talker.json', JSON.stringify(parseData));

  res.status(HTTP_OK_STATUS).json({ message: 'Pessoa palestrante deletada com sucesso' });
};

module.exports = deleteTalkerMiddleware;