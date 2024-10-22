const error = require("../middlewares/error");
const credental = require("../routes/credental");

module.exports = function (app) {
  app.use("/api/v1/credential", credental);
  app.use(error);
};
