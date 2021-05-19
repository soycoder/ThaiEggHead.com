import ProfileEducation from "../models/profile.education.js";

// Retrieve and return all ProfileEducation from the const ProfileEducation.
export const list = (req, res) => {
  ProfileEducation.find()
    .then((result) => res.json(result))
    .catch((err) =>
      res.status(500).send({ errors: { global: "Server Error" } })
    );
};

// add new Profile Interest
export const create = (req, res) => {
  ProfileEducation.findOne({}, {}, { sort: { createdAt: -1 } }, function (err, interest) {
    // console.log(interest);
    let old_id = "";
    if (interest) old_id = interest.interestID;
    else old_id = "0";

    let data = req.body;
    data["interestID"] = parseInt(old_id) + 1;

    // add new ProfileEducation with interestID continue
    let profileEducation = new ProfileEducation(data);

    profileEducation
      .save()
      .then(() => {
        return res.send({ success: "Create Successfully" });
      })
      .catch(() =>
        res.status(404).send({
          errors: { global: "Can't add new ProfileEducation interestID " + interestID },
        })
      );
  });
};

// Find a single ProfileEducation with an sku
export const get = (req, res) => {
  const interestID = req.params.interestID;
  ProfileEducation.findOne({ interestID: interestID })
    .then((interest) => {
      if (!interest) {
        return res.status(404).send({
          errors: { global: "interest not found with interestID " + interestID },
        });
      }
      res.json(interest); // default status = 200
    })
    .catch((err) => {
      return res.status(500).send({
        errors: { global: "Error retrieving Profile with interestID " + interestID },
      });
    });
};

// Update a ProfileEducation identified by the interestID in the request
export const put = (req, res) => {
  // Validate Request
  const data = req.body || {};
  console.log(data);

  if (!data || data.interestID != req.params.interestID)
    return res.status(422).send({ error: "interestID must be alphanumeric." });
  // Find ProfileEducation and update it with the request body
  ProfileEducation.findOneAndUpdate(
    { interestID: req.params.interestID },
    { $set: data },
    { new: true }
  )
    .then((profileEducation) => {
      if (!profileEducation) {
        return res.status(404).send({
          errors: { global: "ProfileEducation not found with interestID " + req.params.interestID },
        });
      }
      res.send(profileEducation);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          errors: { global: "ProfileEducation not found with interestID " + req.params.interestID },
        });
      }
      return res.status(500).send({
        errors: {
          global: "Error updating ProfileEducation with interestID " + req.params.interestID,
        },
      });
    });
};

export const remove = (req, res) => {
  const data = req.body || {};
  if (!data || data.interestID != req.params.interestID)
    return res.status(422).send({ error: "interestID must be alphanumeric." });
  ProfileEducation.remove({ interestID: data.interestID })
    .then(() => {
      return res.status(200).send({ success: true });
    })
    .catch(() => {
      return res.status(404).send({
        errors: { global: "ProfileEducation not found with interestID " + req.params.interestID },
      });
    });
};
