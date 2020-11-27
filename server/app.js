const path = require('path'); // for directory
const http = require('http');
const express = require('express');

const publicPath = path.join(__dirname, '../public'); // get static file loc
const port = process.env.PORT || 3001;
const app = express();
const server = http.createServer(app);
const SocketListener = require("./routes/SocketListener");

app.use(express.static(publicPath));

server.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});

new SocketListener(server);
