declare type Environment = {
  NODE_ENV: 'development' | 'production';
  PORT: number;
  DATABASE_URL: string;
};

declare module 'environment' {
  const value: Environment;
  export default value;
}