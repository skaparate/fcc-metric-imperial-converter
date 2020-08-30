/*
 *
 *
 *       Complete the handler logic below
 *
 *
 */

const { init } = require("../server");

class ValidationError extends Error {
  constructor(msg, input, reason = "") {
    super(msg);
    this.input = input;
    this.reason = reason;
  }
}

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
  const regex = new RegExp(/([\d\.\/]+)?\s*([a-z]+)$/, "i");

  function inputToNumber(input) {
    console.debug("Input to number:", input);
    let num;
    try {
      num = parseFloat(input);
    } catch (e) {
      throw new ValidationError("invalid number", input);
    }

    console.debug("Parsed number:", num);
    return num;
  }

  /**
   * Parses the input data and converts it to an object with
   * two properties:
   *
   * unit: the unit found on the data,
   * number: the parsed number.
   *
   * @param {String} data The data to parse.
   * @throws Error if the unit or number are not valid.
   */
  this.parse = function (data) {
    console.debug("Parsing user input:", data);
    if (!data) {
      throw new ValidationError(
        "invalid number and unit",
        input,
        "no data passed"
      );
    }

    const input = data.trim().toLowerCase();
    const match = input.match(regex);
    console.debug("Matched result:", match);

    if (!match) {
      throw new ValidationError("invalid number and unit", input);
    }

    if (!units.hasOwnProperty(match[2])) {
      throw new ValidationError("invalid unit", input);
    }

    console.debug("Unit:", match[2]);
    let ms = 1;

    if (match[1]) {
      const slashIndex = match[1].indexOf("/");
      if (slashIndex === 0) {
        throw new ValidationError("invalid number", input, "empty fraction");
      }
      if (slashIndex > 0) {
        const split = match[1].split("/");
        if (split.length > 2) {
          throw new ValidationError(
            "invalid number",
            input,
            "more than 1 fraction"
          );
        }
        const left = inputToNumber(split[0]);
        const right = inputToNumber(split[1]);
        ms = left / right;
      } else {
        ms = inputToNumber(match[1]);
      }
    }
    const result = {
      unit: match[2],
      number: ms,
    };
    console.debug("Parsed result:", result);
    return result;
  };

  this.getNum = function (input) {
    return this.parse(input).number;
  };

  this.getUnit = function (input) {
    return this.parse(input).unit;
  };

  this.getReturnUnit = function (initUnit) {
    const prop = units[initUnit];
    if (!prop) {
      console.error("The initial unit was not found:", initUnit);
      throw new ValidationError("invalid unit", initUnit);
    }
    return prop.convertsTo;
  };

  this.spellOutUnit = function (unit) {
    const prop = units[unit];
    if (prop === undefined) {
      throw new ValidationError("invalid unit", unit);
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

  this.getString = function (initNum, initUnit, returnNum, returnUnit) {};
}

module.exports = ConvertHandler;
