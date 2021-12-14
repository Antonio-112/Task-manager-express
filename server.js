const express = require('express');
const connectDB = require('./database');
const morgan = require('morgan');
const swaggerUi = require('swagger-ui-express');
const swaggerDocs = require('swagger-jsdoc');
const {readdirSync} = require('fs');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

connectDB.connectDB();

app.use(morgan('dev'));
app.use(express.json({limit: '1mb'}));
app.use(express.urlencoded({extended: false}));
app.use('/api/docs',
    swaggerUi.serve, swaggerUi.setup(swaggerDocs, {explorer: false}));

readdirSync('./routes').map((a) => {
  app.use(`/api/${a.split('.')[0]}`, require(`./routes/${a}`));
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
