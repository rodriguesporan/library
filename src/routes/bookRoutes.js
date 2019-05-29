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
  bookRouter.route('/:id').get((req, res) => {
    const { id } = req.params;
    (async function query() {
      const request = new sql.Request();
      const { recordset } = await request.query(`SELECT * FROM books WHERE id = '${id}'`);
      const [book] = recordset;
      res.render('bookView', { title: 'Library', nav, book });
    }());
  });
  return bookRouter;
};
module.exports = route;
