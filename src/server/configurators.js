const express = require("express");
const cors = require("cors");
const path = require("path");
const { Server } = require("socket.io");

const serveStaticApplication = (req, res) => {
    res.sendFile(path.join(__dirname, "../static", "index.html"));
};

const configureExpressApp = () => {
    const app = express();

    app.use(cors()).use(express.static(path.join(__dirname, "../static")));

    app.get("/", serveStaticApplication);

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

module.exports = {
    configureExpressApp,
    configureSockets,
};