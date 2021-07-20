'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.corsOptions = exports.getEnv = undefined;

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_dotenv2.default.config();

var ENV = {
  API_URL: 'http://localhost:3000',
  APP_PORT: '5000',
  DB_USER_NAME: 'vonhattruong',
  DB_PASSWORD: 'brl8rMmRP2bhjfp5',
  DB_NAME: 'fullerton-health-db',

  EXPIRE_TIME: '24h',
  HASH_ALGORITHM: 'HS384',
  SECRET_KEY: '2D&9EqNy'
};

var getEnv = exports.getEnv = function getEnv(value) {
  return ENV[value];
};

var corsOptions = exports.corsOptions = {
  // allowedHeaders: ["Origin", "X-Requested-With", "Content-Type", "Accept", "X-Access-Token"],
  allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'X-Access-Token', 'Authorization'],
  credentials: true,
  methods: 'GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE',
  origin: '*',
  preflightContinue: false
};