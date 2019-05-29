const express = require('express');
const chalk = require('chalk'); // colorir mensagens
const debug = require('debug')('app'); // exibe mensagens do console somente quando nao estamos em producao
const morgan = require('morgan'); // mostra os dados do cliente e suas requisicoes
const path = require('path'); // garante que os caminhas das pastas serão montados de forma correta
const sql = require('mssql'); // Microsoft SQL Client

const app = express();
const port = process.env.PORT || 3000;
const config = {
  user: 'library',
  password: 'psL1brary',
  server: 'library.database.windows.net', // You can use 'localhost\\instance' to connect to named instance
  database: 'PSLibrary',
  options: {
    encrypt: true, // Use this if you're on Windows Azure
  },
};
sql.connect(config).catch(err => debug(err));
app.use(morgan('tiny'));
app.use(express.static(path.join(__dirname, '/public/')));
app.use('/css', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/css')));
app.use('/js', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/js')));
app.use('/js', express.static(path.join(__dirname, '/node_modules/jquery/dist')));
app.set('views', './src/views');
app.set('view engine', 'ejs');
const nav = [{ title: 'Author', link: '/authors' }, { title: 'Book', link: '/books' }];
const bookRouter = require('./src/routes/bookRoutes')(nav);

app.use('/books', bookRouter);
app.get('/', (req, res) => res.render('index', { title: 'Library', nav }));
app.listen(port, () => debug(`Server listenning on port ${chalk.green(port)}`));
