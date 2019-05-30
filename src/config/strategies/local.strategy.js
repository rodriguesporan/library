const passport = require('passport');
const { Strategy } = require('passport-local');
const debug = require('debug')('app:local.strategy');
const { MongoClient } = require('mongodb');

module.exports = function localStrategy() {
  passport.use(new Strategy({
    usernameField: 'username',
    passwordField: 'password',
  }, (username, password, done) => {
    const url = 'mongodb://localhost:27017';
    const dbName = 'libraryDB';
    (async function mongo() {
      let client;
      try {
        client = await MongoClient.connect(url);
        const db = client.db(dbName);
        const coll = await db.collection('users');
        const user = await coll.findOne({ username });
        if (user.password === password) {
          done(null, user);
        } else {
          done(null, false);
        }
      } catch (error) {
        debug(error.stack);
      }
      client.close();
    }());
  }));
};
