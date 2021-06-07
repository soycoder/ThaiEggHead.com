import Answer from "../models/Answer.js";

// Retrieve and return all products from the const Products.
export const list = (req, res) => {
  Answer.find()
    .then((result) => res.json(result))
    .catch((err) =>
      res.status(500).send({ errors: { global: "Server Error" } })
    );
};

// add new answer
export const create = (req, res) => {
  Answer.findOne({}, {}, { sort: { createdAt: -1 } }, function (err, post) {
    // console.log(post);
    let old_id = "";
    if (post) old_id = post.answerID;
    else old_id = "0";

    let data = req.body;
    data["answerID"] = parseInt(old_id) + 1;

    //new answer with answerID continue
    let answer = new Answer(req.body);

    answer
      .save()
      .then(() => {
        return res.send({
          success: "Create Successfully",
          answerID: `${data["answerID"]}`,
        });
      })
      .catch(() =>
        res.status(404).send({
          errors: { global: "Cann't add new answer answerID " + answerID },
        })
      );
  });
};

// Find a single answer with an answerID
export const get = (req, res) => {
  const answerID = req.params.answerID;
  Answer.findOne({ answerID: answerID })
    .then((answer) => {
      if (!answer) {
        return res.status(404).send({
          errors: { global: "Answer not found with answerID " + answerID },
        });
      }
      res.json(answer); // default status = 200
    })
    .catch((err) => {
      return res.status(500).send({
        errors: { global: "Error retrieving Answer with answerID " + answerID },
      });
    });
};

// Update a answer identified by the answerID in the request
export const put = (req, res) => {
  // Validate Request
  const data = req.body || {};
  console.log(data);

  if (!data || data.answerID != req.params.answerID)
    return res.status(422).send({ error: "answerID must be alphanumeric." });
  // Find Answer and update it with the request body
  Answer.findOneAndUpdate(
    { answerID: req.params.answerID },
    { $set: data },
    { new: true }
  )
    .then((answer) => {
      if (!answer) {
        return res.status(404).send({
          errors: {
            global: "Answer not found with answerID " + req.params.answerID,
          },
        });
      }
      res.send(answer);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          errors: {
            global: "Answer not found with answerID " + req.params.answerID,
          },
        });
      }
      return res.status(500).send({
        errors: {
          global: "Error updating Answer with answerID " + req.params.answerID,
        },
      });
    });
};

export const remove = (req, res) => {
  const data = req.body || {};
  if (!data || data.answerID != req.params.answerID)
    return res.status(422).send({ error: "answerID must be alphanumeric." });
  Answer.remove({ answerID: data.answerID })
    .then(() => {
      return res.status(200).send({ success: true });
    })
    .catch(() => {
      return res.status(404).send({
        errors: {
          global: "Answer not found with answerID " + req.params.answerID,
        },
      });
    });
};
