export interface IConfig {
  port: number;
  database: {
    host: string;
    port: number;
    password: string;
    user: string;
    database: string;
  };
  token: {
    accessTokenSecret: string;
    accessTokenExpiresIn: string;
  };
}
