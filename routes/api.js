/*
 *
 *
 *       Complete the API routing below
 *
 *
 */

"use strict";
const ConvertHandler = require("../controllers/convertHandler.js");

module.exports = function (app) {
  const convertHandler = new ConvertHandler();

  app.route("/api/convert").get(function (req, res) {
    const input = req.query.input;
  });
};
