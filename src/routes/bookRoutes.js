const express = require('express');
// const debug = require('debug')('app:bookRoutes');
const sql = require('mssql');

const bookRouter = express.Router();
const route = (nav) => {
  bookRouter.route('/').get((req, res) => {
    (async function query() {
      const request = new sql.Request();
      const { recordset } = await request.query('SELECT * FROM books');
      res.render('bookListView', { title: 'Library', nav, books: recordset });
    }());
  });
  bookRouter.route('/:id').all((req, res, next) => {
    const { id } = req.params;
    (async function query() {
      const request = new sql.Request();
      const { recordset } = await request.query(`SELECT * FROM books WHERE id = '${id}'`);
      [req.book] = recordset;
      next();
    }());
  }).get((req, res) => {
    res.render('bookView', { title: 'Library', nav, book: req.book });
  });
  return bookRouter;
};
module.exports = route;
