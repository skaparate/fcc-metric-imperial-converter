/*
 *
 *
 *       Complete the API routing below
 *
 *
 */
const ConvertHandler = require("../controllers/convertHandler.js");

module.exports = function (app) {
  const convertHandler = new ConvertHandler();

  app.route("/api/convert").get(function (req, res) {
    const input = req.query.input;
    const initNum = convertHandler.getNum(input);
    const initUnit = convertHandler.getUnit(input);
    
    if (convertHandler.isError(initNum) && convertHandler.isError(initUnit)) {
      return res.send("invalid number and unit");
    } else if (convertHandler.isError(initNum)) {
      return res.send(initNum);
    } else if (convertHandler.isError(initUnit)) {
      return res.send(initUnit);
    }

    const returnUnit = convertHandler.getReturnUnit(initUnit);
    const returnNum = convertHandler.convert(initNum, initUnit);
    res.json({
      initNum,
      initUnit,
      returnNum,
      returnUnit,
      string: convertHandler.getString(
        initNum,
        initUnit,
        returnNum,
        returnUnit
      ),
    });
  });

  app.use(function (error, req, res, next) {
    if (error) {
      console.error("An error ocurred:", error);
      return res.json({ error: error.message });
    }
    next();
  });
};
