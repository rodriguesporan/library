const express = require('express');

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
  bookRouter.route('/').get((req, res) => res.render('bookListView', { title: 'Library', nav, books }));
  bookRouter.route('/:id').get((req, res) => {
    const { id } = req.params;
    res.render('bookView', { title: 'Library', nav, book: books[id] });
  });
  return bookRouter;
};
module.exports = route;
