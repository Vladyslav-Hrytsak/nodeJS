import dotenv from "dotenv";

dotenv.config();

export const config = {
  PORT: process.env.PORT || 3000,
  HOST: process.env.HOST || "localhost",
  MONGO_URL: process.env.MONGO_URL || "",

  JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET || "default_access_secret",
  JWT_ACCESS_EXPIRATION: process.env.JWT_ACCESS_EXPIRATION || "30m",

  JWT_REFRESH_SECRET:
    process.env.JWT_REFRESH_SECRET || "default_refresh_secret",
  JWT_REFRESH_EXPIRATION: process.env.JWT_REFRESH_EXPIRATION || "10d",

  SMTP_EMAIL: process.env.SMTP_EMAIL,
  SMTP_PASSWORD: process.env.SMTP_PASSWORD,

  SENDGRID_API_KEY: process.env.SENDGRID_API_KEY,
  SEND_GRID_TO_EMAIL: process.env.SEND_GRID_TO_EMAIL,

  FRONT_URL: process.env.FRONT_URL,
  FRONT_URL_OLD_VISIT: process.env.FRONT_URL_OLD_VISIT,

  ACTION_FORGOT_PASSWORD_EXPIRATION:
    process.env.ACTION_FORGOT_PASSWORD_EXPIRATION || "10h",
  ACTION_FORGOT_PASSWORD_SECRET:
    process.env.ACTION_FORGOT_PASSWORD_SECRET || "default_access_secret",
  ACTION_VERIFY_EXPIRATION: process.env.ACTION_VERIFY_EXPIRATION,
  ACTION_VERIFY_SECRET: process.env.ACTION_VERIFY_SECRET,
};
