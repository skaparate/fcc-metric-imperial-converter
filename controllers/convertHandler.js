/*
 *
 *
 *       Complete the handler logic below
 *
 *
 */

const { init } = require("../server");

/**
 * Controller in charge of converting between
 * metric and imperial units.
 */
function ConvertHandler() {
  const galToL = 3.78541,
    lbsToKg = 0.453592,
    miTokm = 1.60934;
  const units = {
    gal: {
      convertsTo: "l",
      spell: "gallons",
    },
    l: {
      convertsTo: "gal",
      spell: "litres",
    },
    mi: {
      convertsTo: "km",
      spell: "miles",
    },
    km: {
      convertsTo: "mi",
      spell: "kilometers",
    },
    lbs: {
      convertsTo: "kg",
      spell: "pounds",
    },
    kg: {
      convertsTo: "lbs",
      spell: "kilograms",
    },
  };

  function inputToNumber(input) {
    console.debug("Input to number:", input);
    let num;
    try {
      num = parseFloat(input);
    } catch (e) {
      num = "invalid number";
    }

    console.debug("Parsed number:", num);
    return num;
  }

  function extractUnit(data) {
    console.debug("Extracting unit:", data);
    if (!data) {
      return "invalid unit";
    }
    const input = data.trim().toLowerCase();
    const match = input.match(/([a-z]+)$/);
    console.debug("Matched unit:", match);
    if (match !== null && match[1] && units.hasOwnProperty(match[1])) {
      return match[1];
    }
    return "invalid unit";
  }

  function extractNumber(data) {
    console.debug("Extracting number:", data);
    if (!data) {
      return "invalid number";
    }

    const match = data.match(/^([\d\.\/]+)/);
    console.debug("Matched number:", match);

    if (match !== null && match[1]) {
      const slashIndex = match[1].indexOf("/");

      if (slashIndex === 0) {
        return "invalid number";
      }

      if (slashIndex > 0) {
        const split = match[1].split("/");
        if (split.length > 2) {
          return "invalid number";
        }

        const left = inputToNumber(split[0]);
        const right = inputToNumber(split[1]);
        return left / right;
      } else {
        return inputToNumber(match[1]);
      }
    }

    console.debug("Returning default number");
    return 1;
  }

  this.isError = function (input) {
    return input === "invalid number" || input === "invalid unit";
  };

  this.getNum = function (input) {
    return extractNumber(input);
  };

  this.getUnit = function (input) {
    return extractUnit(input);
  };

  this.getReturnUnit = function (initUnit) {
    const prop = units[initUnit];
    console.debug("Returned unit prop:", prop);
    if (!prop) {
      console.error("The initial unit was not found:", initUnit);
      throw new Error("invalid unit");
    }
    return prop.convertsTo;
  };

  this.spellOutUnit = function (unit) {
    const prop = units[unit];
    if (prop === undefined) {
      throw new Error("invalid unit");
    }
    return prop.spell;
  };

  this.convert = function (initNum, initUnit) {
    const toUnit = this.getReturnUnit(initUnit);

    if (toUnit === "gal") {
      return initNum / galToL;
    }
    if (toUnit === "l") {
      return initNum * galToL;
    }
    if (toUnit === "mi") {
      return initNum / miTokm;
    }
    if (toUnit === "km") {
      return initNum * miTokm;
    }
    if (toUnit === "lbs") {
      return initNum / lbsToKg;
    }
    return initNum * lbsToKg;
  };

  this.getString = function (initNum, initUnit, returnNum, returnUnit) {
    return `${initNum} ${this.spellOutUnit(
      initUnit
    )} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`;
  };
}

module.exports = ConvertHandler;
