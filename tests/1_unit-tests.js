/*
 *
 *
 *       FILL IN EACH UNIT TEST BELOW COMPLETELY
 *       -----[Keep the tests in the same order!]----
 *       (if additional are added, keep them at the very end!)
 */

const chai = require("chai");
const assert = chai.assert;
const ConvertHandler = require("../controllers/convertHandler.js");

const convertHandler = new ConvertHandler();

suite("Unit Tests", function () {
  suite("Function convertHandler.getNum(input)", function () {
    test("Whole number input", function (done) {
      const input = "32L";
      assert.equal(convertHandler.getNum(input), 32);
      done();
    });

    test("Decimal Input", function (done) {
      const input = ["1.2gal", ".3gal", ".3l", ".1mi"];
      const expected = [1.2, 0.3, 0.3, 0.1];

      input.forEach(function (input, index) {
        assert.equal(convertHandler.getNum(input), expected[index]);
      });
      done();
    });

    test("Fractional Input", function (done) {
      const input = ["1/2gal", "2/3l", "3/1lbs", "20/10km"];
      const expected = [0.5, 0.6666666666666666, 3, 2];
      try {
        input.forEach(function (input, index) {
          assert.equal(convertHandler.getNum(input), expected[index]);
        });
      } catch (e) {
        console.error(e);
        return done(e);
      }
      done();
    });

    test("Fractional Input w/ Decimal", function (done) {
      const input = ["1/2gal", "2.3/3l", "3/1l", ".2/.3km"];
      const expected = [0.5, 0.7666666666666666, 3, 0.6666666666666667];
      input.forEach(function (input, index) {
        assert.equal(convertHandler.getNum(input), expected[index]);
      });
      done();
    });

    test("Invalid Input (double fraction)", function (done) {
      const input = "1/2/3gal";
      assert.throws(() => {
        convertHandler.getNum(input);
      }, "invalid number");
      done();
    });

    test("No Numerical Input", function (done) {
      const input = "gal";
      assert.equal(convertHandler.getNum(input), 1);
      done();
    });
  });

  suite("Function convertHandler.getUnit(input)", function () {
    test("For Each Valid Unit Inputs", function (done) {
      const input = [
        "gal",
        "l",
        "mi",
        "km",
        "lbs",
        "kg",
        "GAL",
        "L",
        "MI",
        "KM",
        "LBS",
        "KG",
      ];
      input.forEach(function (ele) {
        const result = convertHandler.getUnit(ele);
        assert.equal(result, ele.toLowerCase());
      });
      done();
    });

    test("Unknown Unit Input", function (done) {
      const input = "kb";
      assert.throws(function () {
        convertHandler.getUnit(input);
      }, "invalid unit");
      done();
    });
  });

  suite("Function convertHandler.getReturnUnit(initUnit)", function () {
    test("For Each Valid Unit Inputs", function (done) {
      const input = ["gal", "l", "mi", "km", "lbs", "kg"];
      const expect = ["l", "gal", "km", "mi", "kg", "lbs"];
      input.forEach(function (ele, i) {
        assert.equal(convertHandler.getReturnUnit(ele), expect[i]);
      });
      done();
    });
  });

  suite("Function convertHandler.spellOutUnit(unit)", function () {
    test("For Each Valid Unit Inputs", function (done) {
      const input = ["gal", "l", "mi", "km", "lbs", "kg"];
      const expect = [
        "gallons",
        "litres",
        "miles",
        "kilometers",
        "pounds",
        "kilograms",
      ];
      input.forEach(function (ele, i) {
        assert.equal(convertHandler.spellOutUnit(ele), expect[i]);
      });
      done();
    });
  });

  suite("Function convertHandler.convert(num, unit)", function () {
    test("Gal to L", function (done) {
      const input = [5, "gal"];
      const expected = 18.9271;
      try {
        assert.approximately(
          convertHandler.convert(input[0], input[1]),
          expected,
          0.1
        ); //0.1 tolerance
      } catch (e) {
        console.error(e);
        return done(e);
      }
      done();
    });

    test("L to Gal", function (done) {
      const input = [3, "l"];
      const expected = 0.7925186;
      assert.approximately(
        convertHandler.convert(input[0], input[1]),
        expected,
        0.1
      );
      done();
    });

    test("Mi to Km", function (done) {
      const input = [3.232, "mi"];
      const expected = 5.2014;
      assert.approximately(
        convertHandler.convert(input[0], input[1]),
        expected,
        0.1
      );
      done();
    });

    test("Km to Mi", function (done) {
      const input = [53.29, "km"];
      const expected = 33.11287;
      assert.approximately(
        convertHandler.convert(input[0], input[1]),
        expected,
        0.1
      );
      done();
    });

    test("Lbs to Kg", function (done) {
      const input = [3.9, "lbs"];
      const expected = 1.76901;
      assert.approximately(
        convertHandler.convert(input[0], input[1]),
        expected,
        0.1
      );
      done();
    });

    test("Kg to Lbs", function (done) {
      const input = [3.1111111111111107, "kg"];
      const expected = 6.858825934640635;
      assert.approximately(
        convertHandler.convert(input[0], input[1]),
        expected,
        0.1
      );
      done();
    });
  });
});
