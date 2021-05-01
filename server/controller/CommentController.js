import Comment from "../models/Comment.js";

// Retrieve and return all products from the const Products.
export const list = (req, res) => {
  Comment.find()
    .then((result) => res.json(result))
    .catch((err) =>
      res.status(500).send({ errors: { global: "Server Error" } })
    );
};
// add new comment
export const create = (req, res) => {
  let comment = new Comment(req.body);
  comment
    .save()
    .then(() => {
      return res.send({ success: "Create Successfully" });
    })
    .catch(() =>
      res.status(404).send({
        errors: { global: "Cann't add new comment commentID " + commentID },
      })
    );
};

// Find a single comment with an sku
export const get = (req, res) => {
  const commentID = req.params.commentID;
  Comment.findOne({ commentID: commentID })
    .then((comment) => {
      if (!comment) {
        return res.status(404).send({
          errors: { global: "Comment not found with commentID " + commentID },
        });
      }
      res.json(comment); // default status = 200
    })
    .catch((err) => {
      return res.status(500).send({
        errors: { global: "Error retrieving Comment with commentID " + commentID },
      });
    });
};

// Update a comment identified by the commentID in the request
export const put = (req, res) => {
  // Validate Request
  const data = req.body || {};
  console.log(data);

  if (!data || data.commentID != req.params.commentID)
    return res.status(422).send({ error: "commentID must be alphanumeric." });
  // Find Comment and update it with the request body
  Comment.findOneAndUpdate(
    { commentID: req.params.commentID },
    { $set: data },
    { new: true }
  )
    .then((comment) => {
      if (!comment) {
        return res.status(404).send({
          errors: { global: "Comment not found with commentID " + req.params.commentID },
        });
      }
      res.send(comment);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          errors: { global: "Comment not found with commentID " + req.params.commentID },
        });
      }
      return res.status(500).send({
        errors: {
          global: "Error updating Comment with commentID " + req.params.commentID,
        },
      });
    });
};

export const remove = (req, res) => {
  const data = req.body || {};
  if (!data || data.commentID != req.params.commentID)
    return res.status(422).send({ error: "commentID must be alphanumeric." });
  Comment.remove({ commentID: data.commentID })
    .then(() => {
      return res.status(200).send({ success: true });
    })
    .catch(() => {
      return res.status(404).send({
        errors: { global: "Comment not found with commentID " + req.params.commentID },
      });
    });
};
