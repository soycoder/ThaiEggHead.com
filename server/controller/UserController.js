import jsonwebtoken from "jsonwebtoken";
import bcrypt from "bcrypt";

import { jwtSecret } from "../config/jwtConfig.js";
import { isBlank, logError, validatorEmail } from "../util/util.js";

import User from "../models/User.js";

// Retrieve and return all products from the const Products.
export const list = (req, res) => {
  User.find()
    .then((result) => res.json(result))
    .catch((err) =>
      res.status(500).send({ errors: { global: "Server Error" } })
    );
};

// Check Sign in
export let checkSignin = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res.status(422).json(logError("Required fields"));
  else {
    User.findOne({ email: email })
      .then((user) => {
        if (!user) {
          return res.status(404).json(logError(err || "Not found email"));
        } else {
          if (user.validPassword(password)) {
            return res.json({ user: user.toAuthJSON() });
          } else {
            return res.status(401).json(logError("-Invalid credential"));
          }
        }
      })
      .catch((err) => res.status(401).json(logError(err)));
  }
};

// add new user
export const create = (req, res) => {
  User.findOne({}, {}, { sort: { createdAt: -1 } }, function (err, _user) {
    console.log(_user);
    let old_id = "";
    if (_user) old_id = _user.userID;
    else old_id = "0";

    let userID = parseInt(old_id) + 1;

    let { firstName, lastName, email, password, role, bio, googleID, imgURL } =
      req.body;

    if (!firstName || !lastName || !email || !password)
      return res.status(422).json(logError("Invalid user registration info."));
    if (!validatorEmail(email))
      return res.status(422).json(logError("Invalid email address."));

    role = isBlank(role)
      ? "user"
      : role === "admin" || role === "user"
      ? role
      : "user";

    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(password, salt, (err, hash) => {
        if (err) return res.status(400).json(logError(err));

        var newUser = new User({
          userID,
          firstName,
          lastName,
          email,
          password: hash,
          role,
          bio,
          googleID,
          imgURL,
        });

        // Save User in the database
        User.init().then(function () {
          // avoid dup by wait until finish building index
          newUser
            .save()
            .then((user) => {
              return res.json({
                success: true,
                message: "User Registered",
                user: newUser.toNewRegisterJSON(),
              });
            })
            .catch((err) => {
              return res.status(400).json(logError(err));
            });
        });
      });
    });
  });
};

// Find a single user with an sku
export const get = (req, res) => {
  const userID = req.params.userID;
  User.findOne({ userID: userID })
    .then((user) => {
      if (!user) {
        return res.status(404).send({
          errors: { global: "User not found with userID " + userID },
        });
      }
      res.json(user); // default status = 200
    })
    .catch((err) => {
      return res.status(500).send({
        errors: { global: "Error retrieving User with userID " + userID },
      });
    });
};

// Find a single user with an sku
export const getByGoogleID = (req, res) => {
  const googleID = req.params.googleID;
  User.findOne({ googleID: googleID })
    .then((user) => {
      if (!user) {
        return res.status(404).send({
          errors: { global: "User not found with googleID " + googleID },
        });
      }
      res.json(user); // default status = 200
    })
    .catch((err) => {
      return res.status(500).send({
        errors: { global: "Error retrieving User with googleID " + googleID },
      });
    });
};

// Update a user identified by the userID in the request
export const put = (req, res) => {
  // Validate Request
  const data = req.body || {};
  console.log(data);

  if (!data || data.userID != req.params.userID)
    return res.status(422).send({ error: "userID must be alphanumeric." });
  // Find User and update it with the request body
  User.findOneAndUpdate(
    { userID: req.params.userID },
    { $set: data },
    { new: true }
  )
    .then((user) => {
      if (!user) {
        return res.status(404).send({
          errors: { global: "User not found with userID " + req.params.userID },
        });
      }
      res.send(user);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          errors: { global: "User not found with userID " + req.params.userID },
        });
      }
      return res.status(500).send({
        errors: {
          global: "Error updating User with userID " + req.params.userID,
        },
      });
    });
};

export const remove = (req, res) => {
  const data = req.body || {};
  if (!data || data.userID != req.params.userID)
    return res.status(422).send({ error: "userID must be alphanumeric." });
  User.remove({ userID: data.userID })
    .then(() => {
      return res.status(200).send({ success: true });
    })
    .catch(() => {
      return res.status(404).send({
        errors: { global: "User not found with userID " + req.params.userID },
      });
    });
};
