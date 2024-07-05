import dotenv from 'dotenv';
dotenv.config();

export const PORT = 2000;
export const mongoDBUrl = process.env.MONGODB_URL;
