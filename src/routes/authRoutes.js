const express = require('express');
const debug = require('debug')('app:authRoutes');
const passport = require('passport');
const { MongoClient } = require('mongodb');

const authRouter = express.Router();
const route = (nav) => {
  authRouter.route('/signUp')
    .post((req, res) => {
      const { username, password } = req.body;
      // Create user
      const url = 'mongodb://localhost:27017';
      const dbName = 'libraryDB';
      (async function createUser() {
        let client;
        try {
          client = await MongoClient.connect(url);
          const db = client.db(dbName);
          const coll = await db.collection('users');
          const result = await coll.insertOne({ username, password });
          const [user] = result.ops;
          req.login(user, () => {
            res.redirect('/auth/profile');
          });
        } catch (error) {
          debug(error.stack);
        }
        client.close();
      }());
    });
  authRouter.route('/signin')
    .get((req, res) => {
      res.render('signin', { nav, title: 'Sign In' });
    }).post(passport.authenticate('local', {
      successRedirect: '/auth/profile',
      failureRedirect: '/',
    }));
  authRouter.route('/profile')
    .all((req, res, next) => {
      if (req.user) {
        next();
      } else {
        res.redirect('/');
      }
    }).get((req, res) => {
      res.json(req.user);
    });
  authRouter.route('/logout')
    .get((req, res) => {
      req.logout();
      res.redirect('/');
    });
  return authRouter;
};
module.exports = route;
