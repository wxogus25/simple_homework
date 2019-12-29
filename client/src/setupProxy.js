const proxy = require("http-proxy-middleware");

module.exports = function(app) {
    app.use(proxy("/test",{target: "http://localhost:6543"}));
};