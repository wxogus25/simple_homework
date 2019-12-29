const proxy = require("http-proxy-middleware");

module.exports = function(app) {
    app.use(proxy("/test",{target: "http://localhost:6543"}));
    app.use(proxy("/region",{target: "http://localhost:6543"}));
};