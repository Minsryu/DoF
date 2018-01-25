const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Using the Schema constructor, create a new UserSchema object
const userSchema = new Schema({

  username: {
    type: String,
    trim: true,
    required: "Username is Required"
  },
  password: {
    type: String,
    trim: true,
    required: "Password is Required"
  },
  img: {
    type: String,
    trim: true
  },
  wins: {
    type: Number
  }
});

// This creates our model from the above schema, using mongoose's model method
const User = mongoose.model("User", userSchema);

// Export the User model
module.exports = User;
