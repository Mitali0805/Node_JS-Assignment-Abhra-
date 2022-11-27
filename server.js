const http = require('http');
const app = require('./app');
require('dotenv').config();
const {logger} = require('./logger')

const port = process.env.PORT || 8000;

const server = http.createServer(app)

server.listen(port,()=>{
    logger.info(`Server is listening on port ${port}`);
    console.log(`Server is listening on port ${port}`);
})