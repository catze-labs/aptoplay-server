declare namespace NodeJS {
  interface ProcessEnv {
    ENVIRONMENT: string;
    DATABASE_URL: string;
    TITLE_ID: string;
    X_SECRET_KEY: string;
    SYSTEM_WALLET_ADDRESS: string;
    SYSTEM_WALLET_PUBLICKEY: string;
    SYSTEM_WALLET_PRIVATE_KEY: string;
  }
}
