declare namespace NodeJS {
  interface ProcessEnv {
    ENVIRONMENT: string;
    DATABASE_URL: string;
    TITLE_ID: string;
    X_SECRET_KEY: string;
  }
}
