const fs = require('fs').promises;

const HTTP_OK_STATUS = 200;

const editTalkerMiddleware = async (req, res) => {
  const data = await fs.readFile('./talker.json', 'utf-8');
  const parseData = await JSON.parse(data);

  const { id } = req.params;
  const newTalker = req.body;
  const editTalker = {
    id: Number(id),
    ...newTalker,
  };

  const index = parseData.findIndex((talker) => talker.id === Number(id));
  parseData.splice(index, 1, editTalker);

  await fs.writeFile('./talker.json', JSON.stringify(parseData));

  res.status(HTTP_OK_STATUS).json(parseData);
};

module.exports = editTalkerMiddleware;