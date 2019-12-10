// const express = require('express');

// const accountsRouter = require('./data/seeds/accountsRouter')

// const server = express();

// server.use(express.json());

// server.use('api/accounts', accountsRouter)

// server.get('/', (req, res) => {
//     res.send('<h2>THE SERVER IS UP AND RUNNING</h2>')
// })

// module.exports = server;

  
const express = require('express');

const accountsRouter = require('./accounts/accountsRouter');

const server = express();

server.use(express.json());

server.use('/api/accounts', accountsRouter);
server.get('/', (req, res) => {
    res.send('<h2>THE SERVER IS UP AND RUNNING</h2>')
})
module.exports = server;