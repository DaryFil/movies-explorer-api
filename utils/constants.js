const URL_REGEX = /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]+\.[a-zA-Z0-9()]+\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)/;

const SUCCESS_CODE_201 = 201;
const SUCCESS_CODE_200 = 200;
const CODE_ERROR_400 = 400;
const CODE_ERROR_401 = 401;
const CODE_ERROR_409 = 409;
const CODE_ERROR_403 = 403;
const CODE_ERROR_404 = 404;
const CODE_ERROR_500 = 500;

const INCORRECT_EMAIL = 'Некорректный email';
const INCORRECT_AUTH_DATA = 'Неправильные почта или пароль';
const INCORRECT_URL = 'Некорректная ссылка';
const INCORRECT_USER_DATA_ADD = 'Переданы некорректные данные при создании пользователя';
const NOT_UNIQUE_EMAIL = 'Пользователь с таким email уже зарегистрирован';
const USER_NOT_FOUND = 'Пользователь с указанным _id не найден.';
const INCORRECT_USER_DATA = 'Передан некорректный _id пользователя';
const INCORRECT_USER_DATA_UPDATE = 'Переданы некорректные данные при обновлении пользователя';
const INCORRECT_DATA_FILM = 'Переданы некорректные данные';
const MOVIE_NOT_FOUND = 'Фильм с указанным _id не найден';
const ERROR_NO_RIGHTS_TO_DELETE = 'Вы не создатель фильма';
const INCORRECT_REQUEST = 'Неверный URL запроса';
const UNAUTHORIZED_ERROR = 'Необходима авторизация';
const SERVER_ERROR = 'На сервере произошла ошибка';

module.exports = {
  URL_REGEX,
  SUCCESS_CODE_201,
  SUCCESS_CODE_200,
  CODE_ERROR_400,
  CODE_ERROR_401,
  CODE_ERROR_403,
  CODE_ERROR_404,
  CODE_ERROR_409,
  CODE_ERROR_500,
  INCORRECT_EMAIL,
  INCORRECT_AUTH_DATA,
  INCORRECT_URL,
  INCORRECT_USER_DATA_ADD,
  NOT_UNIQUE_EMAIL,
  USER_NOT_FOUND,
  INCORRECT_USER_DATA,
  INCORRECT_USER_DATA_UPDATE,
  INCORRECT_DATA_FILM,
  MOVIE_NOT_FOUND,
  ERROR_NO_RIGHTS_TO_DELETE,
  INCORRECT_REQUEST,
  UNAUTHORIZED_ERROR,
  SERVER_ERROR,
};
