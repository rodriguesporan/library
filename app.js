const express = require('express');
const chalk = require('chalk'); // colorir mensagens
const debug = require('debug')('app'); // exibe mensagens do console somente quando nao estamos em producao
const morgan = require('morgan'); // mostra os dados do cliente e suas requisicoes
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;
const bookRouter = express.Router();
app.use(morgan('tiny'));
app.use(express.static(path.join(__dirname, '/public/')));
app.use('/css', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/css')));
app.use('/js', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/js')));
app.use('/js', express.static(path.join(__dirname, '/node_modules/jquery/dist')));
app.set('views', './src/views');
app.set('view engine', 'ejs');
bookRouter.route('/').get((req, res) => res.send('Books'));
bookRouter.route('/single').get((req, res) => res.send('Single Book Page'));
app.use('/books', bookRouter);
app.get('/', (req, res) => res.render('index', { title: 'Library', nav: [{ title: 'Authors', link: '/authors' }, { title: 'Books', link: '/books' }] }));
app.listen(port, () => debug(`Server listenning on port ${chalk.green(port)}`));
