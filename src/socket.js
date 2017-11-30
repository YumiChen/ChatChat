import io from 'socket.io-client';
// Make connection
const socket = io.connect('http://localhost:7000');

module.exports = socket;