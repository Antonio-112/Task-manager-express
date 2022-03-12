/* eslint-disable max-len */
const express = require('express');
const connectDB = require('./infra/database/index');
const morgan = require('morgan');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

const swaggerConfig = require('./api/documentation/swagger.config.json');
const {readdirSync} = require('fs');
const cors = require('cors');
const {corsConfig} = require('./infra/config/corsConfig');
require('dotenv').config();

const app = express();
const swaggerDocs = swaggerJsdoc(swaggerConfig);
app.use(cors(corsConfig));
const port = process.env.PORT || 3000;

connectDB.connectDB();

console.log(process.env.PORT);

app.use(morgan('dev'));
app.use(express.json({limit: '1mb'}));
app.use(express.urlencoded({extended: false}));
app.use('/api/docs',
    swaggerUi.serve, swaggerUi.setup(swaggerDocs, {explorer: true}),
);

readdirSync('./api/routes').map((r) => app.use('/api/v1', require('./api/routes/' + r)));


app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
