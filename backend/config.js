import assert from 'assert';
import dotenv from 'dotenv';
dotenv.config();

assert(process.env.MONGODB_URL?.length > 0, "MONGODB_URL env var must be set");

export const PORT = 2000;
export const mongoDBUrl = process.env.MONGODB_URL;
