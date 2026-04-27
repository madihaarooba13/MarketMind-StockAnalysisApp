// // const mongoose = require("mongoose");

// // const userSchema = new mongoose.Schema({
// //   name: String,
// //   email: String,
// //   password: String,

// //   watchlist: [
// //     {
// //       symbol: String,
// //       price: Number,
// //       change: String,
// //     },
// //   ],
// // });

// // module.exports = mongoose.models.User || mongoose.model("User", userSchema);

// const mongoose = require("mongoose");

// const userSchema = new mongoose.Schema({
//   name: String,
//   email: String,
//   password: String,
//   watchlist: [
//     {
//       symbol: String,
//       price: Number,
//       change: String,
//     },
//   ],
// });

// module.exports =
//   mongoose.models.User || mongoose.model("User", userSchema);

const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: String,
  email: String,

  gender: {
    type: String,
    enum: ["male", "female", "other"],
    default: "other",
  },

  dob: Date,

  location: {
    type: String,
    default: "",
  },

  mobile: {
    type: String,
    default: "",
  },

  bio: {
    type: String,
    default: "",
  },

  preferences: {
    market: { type: String, default: "NSE" },
    currency: { type: String, default: "INR" },
  },

  watchlist: [],
}, { timestamps: true });

// module.exports = mongoose.models.User || mongoose.model("User", UserSchema);
export default mongoose.models.User ||
  mongoose.model("User", UserSchema);