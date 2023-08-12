const express = require('express');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const helmet = require('helmet');
const cors = require('cors');
const { errors } = require('celebrate');
const router = require('./routes/index');

const { requestLogger, errorLogger } = require('./middlewares/logger');

const { DB_URL, PORT } = require('./utils/config');

const { limiter } = require('./middlewares/limiter');

const app = express();

mongoose.connect(DB_URL, {
  useNewUrlParser: true,
});
const allowedCors = ['https://FilmFusion.nomoreparties.co', 'http://localhost:3000'];

const corsOptions = {
  origin: allowedCors,
  optionsSuccessStatus: 200,
  credentials: true,
};

app.use(cors(corsOptions));

app.use(helmet());

app.use(express.json());

app.use(cookieParser());

app.use(limiter);

app.use(requestLogger);

app.use(router);

app.use(errorLogger); // подключаем логгер ошибок

app.use(errors());

app.use(require('./middlewares/error'));

app.listen(PORT, () => {
  console.log(`Приложение слушает порт ${PORT}`);
});
