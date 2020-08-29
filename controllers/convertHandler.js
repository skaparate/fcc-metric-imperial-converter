/*
 *
 *
 *       Complete the handler logic below
 *
 *
 */

/**
 * Controller in charge of converting between
 * metric and imperial units.
 */
function ConvertHandler() {
  this.getNum = function (input) {};

  this.getUnit = function (input) {};

  this.getReturnUnit = function (initUnit) {};

  this.spellOutUnit = function (unit) {};

  this.convert = function (initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    let result;

    return result;
  };

  this.getString = function (initNum, initUnit, returnNum, returnUnit) {};
}

module.exports = ConvertHandler;
