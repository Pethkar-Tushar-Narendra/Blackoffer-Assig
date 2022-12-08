import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import Data from '../Model/dataModel.js';
const dataRouter = express.Router();

dataRouter.get('/data/seed', async (req, res) => {
  await Data.deleteMany({});
  const insertedData = await Data.insertMany(data);
  res.send({ insertedData });
});
dataRouter.get(
  '/data/get',
  expressAsyncHandler(async (req, res) => {
    const DBdata = await Data.find();
    res.send({ DBdata });
  })
);
export default dataRouter;
