const express = require('express');
const debug = require('debug')('app:adminRoutes');
const { MongoClient } = require('mongodb');

const books = [{
  title: 'A preparação do ator', genre: 'Artes cenicas', author: 'Constantin Stanislavski', read: true,
},
{
  title: 'Essencialismo', genre: 'Auto ajuda', author: 'Greg McKeown', read: true,
},
{
  title: 'Feminismo em comum', genre: 'Feminismo', author: 'Marcia Tiburi', read: true,
},
{
  title: 'Como vejo o mundo', genre: 'Filosofia', author: 'Albert Einstein', read: false,
},
];
const adminRouter = express.Router();
const route = () => {
  adminRouter.route('/').get((req, res) => {
    const url = 'mongodb://localhost:27017';
    const dbName = 'libraryDB';
    (async function mongo() {
      let client;
      try {
        client = await MongoClient.connect(url);
        debug('Connected correctly to server');
        const db = client.db(dbName);
        const response = await db.collection('books').insertMany(books);
        res.json(response);
      } catch (error) {
        debug(error.stack);
      }
      client.close();
    }());
  });
  return adminRouter;
};
module.exports = route;
