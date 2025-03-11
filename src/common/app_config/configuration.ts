export default () => ({
  port: parseInt(process.env.APP_PORT, 10) || 3000,
  database: {
    url: process.env.DATABASE_URL,
  },
  jwt: {
    accessToken: {
      secret: process.env.JWT_ACCESS_TOKEN_SECRET,
      age: parseInt(process.env.JWT_ACCESS_TOKEN_AGE),
    },
    refreshToken: {
      secret: process.env.JWT_REFRESH_TOKEN_SECRET,
      age: parseInt(process.env.JWT_REFRESH_TOKEN_AGE),
    },
  },
  logger: {
    level: process.env.LOGGER_LEVEL || 'info',
    format: process.env.LOGGER_FORMAT || 'json',
    output: process.env.LOGGER_OUTPUT || 'console',
    file: {
      fileName: process.env.LOGGER_FILE_NAME || 'app.log',
    },
  },

  environment: process.env.NODE_ENV || 'development',
});
