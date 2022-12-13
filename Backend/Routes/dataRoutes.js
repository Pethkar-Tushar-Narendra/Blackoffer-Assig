import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import Data from '../Model/dataModel.js';
const dataRouter = express.Router();

// dataRouter.get('/data/seed', async (req, res) => {
//   await Data.deleteMany({});
//   const insertedData = await Data.insertMany(data);
//   res.send({ insertedData });
// });
dataRouter.get(
  '/data/get',
  expressAsyncHandler(async (req, res) => {
    const DBdata = await Data.find();
    res.send({ DBdata });
  })
);

dataRouter.get(
  '/data/summary',
  expressAsyncHandler(async (req, res) => {
    const topics = await Data.aggregate([
      {
        $group: {
          _id: '$topic',
          count: { $sum: 1 },
        },
      },
      { $sort: { count: -1 } },
    ]);
    const start_year = await Data.aggregate([
      {
        $group: {
          _id: '$start_year',
          count: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]);
    const country = await Data.aggregate([
      {
        $group: {
          _id: '$country',
          count: { $sum: 1 },
        },
      },
      { $sort: { count: -1 } },
    ]);
    const region = await Data.aggregate([
      {
        $group: {
          _id: '$region',
          count: { $sum: 1 },
        },
      },
      { $sort: { count: -1 } },
    ]);
    const intensity = await Data.aggregate([
      {
        $group: {
          _id: '$intensity',
          count: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]);
    const likelihood = await Data.aggregate([
      {
        $group: {
          _id: '$likelihood',
          count: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]);
    const relevance = await Data.aggregate([
      {
        $group: {
          _id: '$relevance',
          count: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]);
    res.send({
      likelihood,
      relevance,
      intensity,
      region,
      country,
      start_year,
      topics,
    });
  })
);
export default dataRouter;
