

const express = require("express");
const { body, validationResult } = require("express-validator");//document
const Product = require("../models/product_model");
const router = express.Router();




    router.post( "/",

    body("first_name").isLength({ min: 4, max: 20 }).withMessage("name atleast 4 character"),
    body("last_name").isLength({ min: 1, max: 5 }).withMessage("last_Name atleast 1 and max 5 character"),
    body("pincode").isLength({ min: 6, max:6 }).withMessage("pincode at least 6 digit"),
    body("gender").custom((value) => {
      const g = value;
      if ( g == "Male" || g == "Female" || g == "Other" ) {
        return true;
      }
      throw new Error("gender should be Male Female or Other problem");
    }),

    body("pincode").custom((value) => {
    const isNumber = /^[0-9]*$/.test(value);
    if (!isNumber || value <= 0 ) {
      throw new Error("Pincode should be number ");
    }
    return true;
    }),

    body("age").custom((value) => {
    const isNumber = /^[0-9]*$/.test(value);
    if (!isNumber || value <= 0 || value>=101) {
      throw new Error("age cannot be 0 or more then 100");
    }
    return true;
    }),

    body("email").custom(async (value) => {
    const isEmail = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,20}$/.test(value);
    if (!isEmail) {
      throw new Error("Please enter a proper email address");
    }
    const productByEmail = await Product.findOne({ email: value }).lean().exec();
    if (productByEmail) {
      throw new Error("Please try with a different email address");
    }
    return true;
    }),



  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      let newErrors = errors.array().map(({ msg, param, location }) => {
        return {
          [param]: msg,
        };
      });
      return res.status(400).json({ errors: newErrors });
    }




    try {
      const product = await Product.create(req.body);

      return res.status(201).json({ product });
    } catch (e) {
      return res.status(500).json({ status: "failed", message: e.message });
    }
  }
);

module.exports = router;