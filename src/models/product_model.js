const mongoose = require('mongoose');


const ProductSchema = new mongoose.Schema(
    {
      first_name: { type: String, required: true },
      last_name: { type: String, required: true },
      email:{type:String,required:true},
      pincode: { type: Number, required: true },
      age: { type: Number, required: true },
      gender: { type: String, required: true },
      
    },
    {
      versionKey: false,
      timestamps: true,
    }
  );
  module.exports = mongoose.model("product", ProductSchema);
