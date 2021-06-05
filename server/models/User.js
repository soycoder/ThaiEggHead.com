import * as mongooseDef from "mongoose";
import { validatorEmail } from "../util/util.js";
import bcrypt from "bcrypt";
import jsonwebtoken from "jsonwebtoken";
import { jwtSecret } from "../config/jwtConfig.js";

let mongoose = mongooseDef.default;
const userSchema = new mongoose.Schema(
  {
    userID: String,
    googleID: String,
    userName: String,
    email: {
      type: String,
      required: true,
      validate: {
        validator: validatorEmail,
        message: (props) => `${props.value} is not a valid email!`,
      },
      unique: [true, "Must be uniqued"],
      required: [true, "email is required"],
    },
    password: {
      type: String,
      required: true,
      minlength: [40], // bcrypt hash binary size is 40+
    },
    role: { type: String, required: true, default: "user" },
    firstName: String,
    lastName: String,
    imgURL: String,
    avatar: {image: Buffer, contentType: String},
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

// *** Important note ***
// methods in schema must be defined in a function format
// not in big arrow form in order to get a correct "this" property
userSchema.methods.validPassword = function (txtPassword) {
  return bcrypt.compareSync(txtPassword, this.password);
};

userSchema.methods.generateJWT = function () {
  const expiresIn = 1800; // 30 min
  return {
    token: jsonwebtoken.sign(
      {
        _id: this._id,
        userID: this.userID,
        firstName: this.firstName,
        lastName: this.lastName,
        email: this.email,
        role: this.role,
        imgURL: this.imgURL,
      },
      jwtSecret,
      { expiresIn }
    ),
    expiresIn: expiresIn,
  };
};

userSchema.methods.toAuthJSON = function () {
  let genJWT = this.generateJWT();
  return {
    _id: this._id,
    firstName: this.firstName,
    lastName: this.lastName,
    email: this.email,
    role: this.role,
    token: "bearer " + genJWT.token,
    expiresIn: genJWT.expiresIn,
    imgURL: this.imgURL,
  };
};

userSchema.methods.toNewRegisterJSON = function () {
  return {
    _id: this._id,
    firstName: this.firstName,
    lastName: this.lastName,
    email: this.email,
    role: this.role,
  };
};

userSchema.methods.toProfileJSON = function () {
  return {
    _id: this._id,
    firstName: this.firstName,
    lastName: this.lastName,
    email: this.email,
    role: this.role,
    timeRegister: this.timeRegister,
  };
};

// ! Export
let User = mongoose.model("User", userSchema, "User");
export default User;
