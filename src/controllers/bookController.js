const debug = require('debug')('app:bookController');
const { MongoClient, ObjectID } = require('mongodb');

function bookController(bookService, nav) {
  function getIndex(req, res) {
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
  }
  function getById(req, res) {
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
        book.details = await bookService.getBookById(book.bookId);
        res.render('bookView', { title: 'Library', nav, book });
      } catch (error) {
        debug(error);
      }
      client.close();
    }());
  }
  function middleware(req, res, next) {
    // if (req.user) {
      next();
    // } else {
    //   res.redirect('/');
    // }
  }
  return {
    getIndex,
    getById,
    middleware,
  };
}
module.exports = bookController;
