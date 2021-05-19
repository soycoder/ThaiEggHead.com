import * as mongooseDef from "mongoose";
let mongoose = mongooseDef.default;
const userSchema = new mongoose.Schema(
  {
    userID: String,
    googleID: String,
    userName: String,
    email: String,
    password: String,
    firstName: String,
    lastName: String,
    imgURL: String,
    gender: String,
    birthDate: Date,
    bio: String,
    country: String,
    timeRegister: Date,
    score: Number,
    educationList: [Object],
    interestList: [Object],
  },
  { versionKey: false, timestamps: true }
);

let User = mongoose.model("User", userSchema, "User");
export default User;
