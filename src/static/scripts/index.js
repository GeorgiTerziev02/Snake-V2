(function initialize() {
    const socket = window.io();

    socket.on("connect", () => {
        console.log("connected", socket);
    });

    socket.on("message", (data) => {
        console.log("Received message", data);
    })
})();
