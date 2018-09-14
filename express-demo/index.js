const express = require('express');
const app = express();
const logger = require('./middleware/logger');
const morgan = require('morgan');
const config = require('config');
const debug = require('debug')('app:startup');
//const bodyParser = require('body-parser');
const genres = require('./routes/genres');
const home = require('./routes/home');

app.set('view engine', 'pug');

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));
app.use('/api/genres', genres);
app.use('/', home);

//app.use(express.static)
app.use(logger);
app.use((error, req, res, next)=>{
    //debug('error');
    //console.log(error);
    next();
});

//app.use(morgan("default"));

const env = app.get('env');

if(env == "production"){
    //debug(` Name = ${config.get("name")} & Host = ${config.get("mail.host")}`);
}

if(env == "development"){
    //debug(` Name = ${config.get("name")} & Host = ${config.get("mail.host")}`);
}

//debug(`Password : ${config.get("mail.password")}`);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));