require('dotenv').config();
const chalk = require('chalk');
const express = require('express');
const cors = require('cors');

require('./driver/mongo-connection');

const usersRouter = require('./routes/users-routes');
const { request } = require('http');

const port = process.env.PORT;
const app = express();

app.use(cors());
app.use(express.json())

// routes // controllers // models

app.use('/api/users', usersRouter);

app.get('*', (request, response) => {
    return response.send('Not found!');
});

app.listen(port, function () {
    console.log(chalk.green(`El servidor está listo en el puerto: ${port}!`))    
});


