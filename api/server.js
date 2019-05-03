const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');

const server = express();

const projectsRouter = require('../projects/projects-router');

server.use(express.json());
server.use(helmet());
server.use(morgan('dev'));

server.use('/api/projects', projectsRouter)

server.get('/', (req, res) => {
    res.send(`Connected!`);
});

module.exports = server;