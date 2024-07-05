import express from 'express';
import { PORT, mongoDBUrl } from './config.js';
import mongoose from 'mongoose';
import bookRouter from './routes/book.js';

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.status(200).send('Welcome to MERN project.');
});

// Connect to MongoDB and start server
mongoose
  .connect(mongoDBUrl)
  .then(() => {
    console.log('Connected to database.');
    app.listen(PORT, () => {
      console.log(`App is listening to port: ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });

app.use('/api', bookRouter);

export default app;
