import io from 'socket.io-client';
import config from "../../config";

// Make connection
const socket = io.connect(config.server,{
    'sync disconnect on unload': true
});

module.exports = socket;