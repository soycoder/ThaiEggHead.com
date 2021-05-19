import Forum from "../models/Forum.js";

// Retrieve and return all products from the const Products.
export const list = (req, res) => {
  const filter = req.query.subject
  console.log(filter);
  if (!filter) {
    Forum.find()
    .then((result) => res.json(result))
    .catch((err) =>
      res.status(500).send({ errors: { global: "Server Error" } })
    );
  } else {
    Forum.find({listSubject:{ $all:[filter]}})
    .then((result) => res.json(result))
    .catch((err) =>
      res.status(500).send({ errors: { global: "Server Error" } })
    );
  }
};

// add new forum
export const create = (req, res) => {
  Forum.findOne({}, {}, { sort: { createdAt: -1 } }, function (err, post) {
    // console.log(post);
    let old_id = "";
    if (post) old_id = post.forumID;
    else old_id = "0";

    let data = req.body;
    data["forumID"] = parseInt(old_id) + 1;

    // add new forum with forumID continue

    let forum = new Forum(req.body);
    forum
      .save()
      .then(() => {
        return res.send({ success: "Create Successfully" });
      })
      .catch(() =>
        res.status(404).send({
          errors: { global: "Cann't add new forum forumID " + forumID },
        })
      );
  });
};

// Find a single forum with an sku
export const get = (req, res) => {
  const forumID = req.params.forumID;
  Forum.findOne({ forumID: forumID })
    .then((forum) => {
      if (!forum) {
        return res.status(404).send({
          errors: { global: "Forum not found with forumID " + forumID },
        });
      }
      res.json(forum); // default status = 200
    })
    .catch((err) => {
      return res.status(500).send({
        errors: { global: "Error retrieving Forum with forumID " + forumID },
      });
    });
};

// Update a forum identified by the forumID in the request
export const put = (req, res) => {
  // Validate Request
  const data = req.body || {};
  console.log(data);

  if (!data || data.forumID != req.params.forumID)
    return res.status(422).send({ error: "forumID must be alphanumeric." });
  // Find Forum and update it with the request body
  Forum.findOneAndUpdate(
    { forumID: req.params.forumID },
    { $set: data },
    { new: true }
  )
    .then((forum) => {
      if (!forum) {
        return res.status(404).send({
          errors: {
            global: "Forum not found with forumID " + req.params.forumID,
          },
        });
      }
      res.send(forum);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          errors: {
            global: "Forum not found with forumID " + req.params.forumID,
          },
        });
      }
      return res.status(500).send({
        errors: {
          global: "Error updating Forum with forumID " + req.params.forumID,
        },
      });
    });
};

export const remove = (req, res) => {
  const data = req.body || {};
  if (!data || data.forumID != req.params.forumID)
    return res.status(422).send({ error: "forumID must be alphanumeric." });
  Forum.remove({ forumID: data.forumID })
    .then(() => {
      return res.status(200).send({ success: true });
    })
    .catch(() => {
      return res.status(404).send({
        errors: {
          global: "Forum not found with forumID " + req.params.forumID,
        },
      });
    });
};
