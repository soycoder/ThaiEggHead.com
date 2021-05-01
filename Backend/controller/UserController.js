import User from "../models/User.js";

// Retrieve and return all products from the const Products.
export const list = (req, res) => {
  User.find()
    .then((result) => res.json(result))
    .catch((err) =>
      res.status(500).send({ errors: { global: "Server Error" } })
    );
};
// add new user
export const create = (req, res) => {
  let user = new User(req.body);
  user
    .save()
    .then(() => {
      return res.send({ success: "Create Successfully" });
    })
    .catch(() =>
      res.status(404).send({
        errors: { global: "Cann't add new user userID " + userID },
      })
    );
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
