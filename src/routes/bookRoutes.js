const express = require('express');
const debug = require('debug')('app:bookRoutes');
const sql = require('mssql');

const bookRouter = express.Router();
const route = (nav) => {
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
  bookRouter.route('/').get((req, res) => {
    const request = new sql.Request();
    request.query('SELECT * FROM books').then((result) => {
      const { recordset } = result;
      res.render('bookListView', { title: 'Library', nav, books: recordset });
      debug(recordset);
    });
  });
  bookRouter.route('/:id').get((req, res) => {
    const { id } = req.params;
    res.render('bookView', { title: 'Library', nav, book: books[id] });
  });
  return bookRouter;
};
module.exports = route;
