export const envConfiguration = () => ({
  environment: process.env.NODE_ENV || 'dev',
  port: Number(process.env.PORT) || 3000,
  mongodb: process.env.MONGODB || 'mongodb://localhost:27017/test',
  defaultLimit: Number(process.env.DEFAULT_LIMIT) || 20,
});
