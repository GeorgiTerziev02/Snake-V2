const path = require("path");

const serverStaticFiles = (req, res) => {
    res.sendFile(path.join(__dirname, "../static", "index.html"));
};

module.exports = {
    serverStaticFiles,
};
