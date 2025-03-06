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

  environment: process.env.NODE_ENV || 'development',
});
