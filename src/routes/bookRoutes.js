const express = require('express');
const debug = require('debug')('app:bookRoutes');
const { MongoClient, ObjectID } = require('mongodb');

const bookRouter = express.Router();
const route = (nav) => {
  bookRouter.route('/').get((req, res) => {
    const url = 'mongodb://localhost:27017';
    const dbName = 'libraryDB';
    (async function mongo() {
      let client;
      try {
        client = await MongoClient.connect(url);
        debug('Connected correctly to server');
        const db = client.db(dbName);
        const coll = await db.collection('books');
        const books = await coll.find().toArray();
        res.render('bookListView', { title: 'Library', nav, books });
      } catch (error) {
        debug(error.stack);
      }
      client.close();
    }());
  });
  bookRouter.route('/:id').all((req, res, next) => {
    const { id } = req.params;
    const url = 'mongodb://localhost:27017';
    const dbName = 'libraryDB';
    (async function query() {
      let client;
      try {
        client = await MongoClient.connect(url);
        const db = client.db(dbName);
        const coll = await db.collection('books');
        const book = await coll.findOne({ _id: new ObjectID(id) });
        req.book = book;
      } catch (error) {
        debug(error);
      }
      client.close();
      next();
    }());
  }).get((req, res) => {
    res.render('bookView', { title: 'Library', nav, book: req.book });
  });
  return bookRouter;
};
module.exports = route;
