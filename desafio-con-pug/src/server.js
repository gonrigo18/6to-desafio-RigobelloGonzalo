const express = require('express');

const app = express();

app.set('views', './views');

app.set('view engine', 'pug');

app.get('/products', (req, res) => {
  res.render('layout', req.query);
});

const port = 8080;
const server =  app.listen(port, () => {
    console.log(`Http server listening http://localhost:${port}`);
})

server.on('error', err => console.log(`Server error ${err}`));