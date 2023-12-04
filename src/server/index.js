const express = require("express");
const cors = require("cors");
const path = require("path");
const http = require("http");
const { Server } = require("socket.io");
const { serverStaticFiles } = require("../api");

const configureExpressApp = () => {
    const app = express();

    app.use(cors()).use(express.static(path.join(__dirname, "../static")));

    app.get("/", serverStaticFiles);

    return app;
};

const configureSockets = (server) => {
    const io = new Server(server);

    io.on("connection", (socket) => {
        console.log("a user connected", socket);

        io.emit("message", "Hello from server");
    });

    return io;
};

const _startServer = (server, config) => {
    server.listen(config.port, (err) => {
        if (err) {
            console.error(err);
            return;
        }
        console.log(`Server is listening on :${config.port}`);
    });
};

const startServer = (config) => {
    const app = configureExpressApp();
    const server = http.createServer(app);
    configureSockets(server);

    _startServer(server, config);
};

module.exports = {
    startServer,
};
