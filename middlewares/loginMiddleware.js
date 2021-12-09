// REF: token -> https://stackoverflow.com/questions/8532406/create-a-random-token-in-javascript-based-on-user-details#:~:text=You%20could%20generate,Follow
// REF: emailRegex -> https://pt.stackoverflow.com/questions/1386/express%C3%A3o-regular-para-valida%C3%A7%C3%A3o-de-e-mail#:~:text=Primeiramente%20voc%C3%AA%20precisa,problemas%20com%20esses).

const HTTP_OK_STATUS = 200;
const HTTP_BAD_REQUEST_STATUS = 400;

const token = () => {
  const tokenA = Math.random().toString(36).substr(2);
  const tokenB = Math.random().toString(36).substr(2);
  return (tokenA + tokenB).substring(0, 16);
};

const checkEmail = (req, res, next) => {
  const { email } = req.body;
  const emailRegex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i;
  if (!email) {
    return res.status(HTTP_BAD_REQUEST_STATUS).json(
      {
        message: 'O campo "email" é obrigatório',
      },      
    );
  }
  if (!emailRegex.test(email)) {
    return res.status(HTTP_BAD_REQUEST_STATUS).json(
      {
        message: 'O "email" deve ter o formato "email@email.com"',
      },
    ); 
  }
  next();
};

const checkPassword = (req, res, next) => {
  const { password } = req.body;
  if (!password) {
    return res.status(HTTP_BAD_REQUEST_STATUS).json(
      {
        message: 'O campo "password" é obrigatório',
      },
    );
  }
  if (password.length < 6) {
    return res.status(HTTP_BAD_REQUEST_STATUS).json(
      {
        message: 'O "password" deve ter pelo menos 6 caracteres',
      },
    );
  }
  next();
};

const loginMiddleware = (req, res) => res.status(HTTP_OK_STATUS).json(
    {
      token: token(),
    },
  );

module.exports = {
  checkEmail,
  checkPassword,
  loginMiddleware,
};
