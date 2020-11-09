#!/usr/bin/env node

/* 
File name: Server.js
Student Name: Joseph Volpe
StudentID: 301118010
Date: 10/22/2020
*/


/* Module dependencies. */

let app = require('./server/config/app');
let debug = require('debug')('personalporfolio');
let http = require('http');

/* Get port from environment and store in Express. */

let port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

/* Creates HTTP server. */

let server = http.createServer(app);

/* Listens on provided port, on all network interfaces. */

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

/* Normalize a port into a number, string, or false. */

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/* Event listener for HTTP server "error" event. */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/* Event listener for HTTP server "listening" event. */

function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  debug('Listening on ' + bind);
}
