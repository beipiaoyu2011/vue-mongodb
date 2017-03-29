const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const favicon = require('serve-favicon');
const config = require('./config/db');
const pkg = require('./package')

mongoose.connect(config.mongodb);
const db = mongoose.connection;
const port = process.env.PORT || 3000

db.on('error', (err)=>{
    console.log('connecting mongodb error: ', err.message);
});

db.on('open', ()=>{
    console.log(`Connecting to mongodb`);
});

const index = require('./router/index');
const movie = require('./router/movie');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(favicon(__dirname + '/src/assets/favicon.ico'))
app.use(express.static('dist'))

app.use('/', index);
app.use('/api', movie);

app.listen(port, ()=>{
    console.log(`${pkg.name} listening on port ${port}`);
});

module.exports = app;
