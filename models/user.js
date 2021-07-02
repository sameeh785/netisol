const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
      maxlength: 32,
    },

    email: {
      type: String,
      trim: true,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true
    },
    role: {
      type: Number,
      default: 0,
    },
    cart: {
      type: Array,
      default: [],
    },
    address: String,
  },
  { timestamps: true }
);
module.exports = mongoose.model("User", userSchema);
