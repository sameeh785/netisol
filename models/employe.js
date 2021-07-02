const moongoose = require('mongoose');
const employeSchema = new moongoose.Schema({
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
    default: 1,
  },

  age : {
    type : Number,
  },
  country : {
    type : String
  },
  education : {
    type : String
  },
  gender : {
    type : String
  }
})

module.exports = moongoose.model("EMPLOYE",employeSchema)