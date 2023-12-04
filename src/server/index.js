const http = require("http");
const { configureExpressApp } = require("./configurators");
const { configureSockets } = require("./configurators");

const startServer = (server, config) => {
    server.listen(config.port, (err) => {
        if (err) {
            console.error(err);
            return;
        }
        console.log(`Server is listening on :${config.port}`);
    });
};

const runApplication = (config) => {
    const app = configureExpressApp();
    const server = http.createServer(app);
    configureSockets(server);

    startServer(server, config);
};

module.exports = {
    runApplication,
};