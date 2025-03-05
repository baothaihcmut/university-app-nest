export default () => ({
  port: parseInt(process.env.APP_PORT, 10) || 3000,
  database: {
    url: process.env.DATABASE_URL,
  },

  environment: process.env.NODE_ENV || 'development',
});
