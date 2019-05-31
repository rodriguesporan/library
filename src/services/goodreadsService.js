const axios = require('axios');
const xml2js = require('xml2js');
const debug = require('debug')('app:goodreadsService');

const parser = xml2js.Parser({ explicitArray: false });
module.exports = () => ({
  getBookById: id => new Promise((resolve, reject) => {
    axios.get(`https://www.goodreads.com/book/show/${id}.xml?key=R1hAQP0ZVdwgIgWboLlOZg`)
      .then((response) => {
        parser.parseString(response.data, (err, result) => {
          if (err) {
            debug(err);
          } else {
            debug(result.GoodreadsResponse.book);
            resolve(result.GoodreadsResponse.book);
          }
        });
      })
      .catch((error) => {
        debug(error);
        reject(error);
      });
  }),
});
