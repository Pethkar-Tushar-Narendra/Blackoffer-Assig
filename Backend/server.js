import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import dataRouter from './Routes/dataRoutes.js';
dotenv.config();
const app = express();

mongoose.set('strictQuery', true);
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('connected to db');
  })
  .catch((err) => {
    console.log(err.message);
  });

app.use('/api/', dataRouter);

app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`serve at http://localhost:${port}`);
});
