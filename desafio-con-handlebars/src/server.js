const express = require('express');

const exphbs = require('express-handlebars');

const app = express();

const port = 8080;

const products = [];

app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');

app.set('views', 'views')

app.get('/', (req, res) => {
  res.render('stock', { products });
});

app.post('/products', (req, res) => {
  res.render('form')
  products.push(req.body);
  res.redirect('/');
});



const server = app.listen(port, () => {
  console.log(`Http server listening http://localhost:${port}`);
});

server.on('error', err => {
  console.log('Server error', err);
});