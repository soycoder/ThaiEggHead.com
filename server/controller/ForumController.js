// 'use strict';
// import MultipleFile from "../models/mulitipleFileSchema.js";
import Forum from "../models/Forum.js";
import Tag from "../models/Tag.js";

// ! Forum

// Retrieve and return all products from the const Products.
export const list = (req, res) => {
  const filter = req.query.subject;
  console.log(filter);
  if (!filter) {
    Forum.find()
      .sort({ createdAt: -1 })
      .then((result) => res.json(result))
      .catch((err) =>
        res.status(500).send({ errors: { global: "Server Error" } })
      );
  } else {
    Forum.find({ listSubject: { $all: [filter] } })
      .sort({ createdAt: -1 })
      .then((result) => res.json(result))
      .catch((err) =>
        res.status(500).send({ errors: { global: "Server Error" } })
      );
  }
};

// listEachUser
export const listEachUser = (req, res) => {
  let userID = req.params.userID;

  Forum.find({ userID: userID })
    .sort({ createdAt: -1 })
    .then((result) => res.json(result))
    .catch((err) =>
      res.status(500).send({ errors: { global: "Server Error" } })
    );
};

// add new Forum
export const create = async (req, res, next) => {
  try {
    Forum.findOne({}, {}, { sort: { createdAt: -1 } }, function (err, _forum) {
      // Set ForumID
      let old_id = "";
      if (_forum) old_id = _forum.forumID;
      else old_id = "0";

      let data = req.body;
      data["forumID"] = parseInt(old_id) + 1;

      let filesArray = [];
      if (req.files) {
        req.files.forEach((element) => {
          const file = {
            fileName: element.originalname,
            filePath: element.path,
            fileType: element.mimetype,
            fileSize: fileSizeFormatter(element.size, 2),
          };
          filesArray.push(file);
        });
      }
      const forum = new Forum({
        forumID: data["forumID"],
        userID: req.body.userID,
        title: req.body.title,
        postText: req.body.body,
        listTag: req.body.tag,
        listSubject: req.body.subject,
        listImage: filesArray,
      });
      forum.save().then(() => {
        res.status(201).send("Files Uploaded Successfully");
      });
    });
  } catch (error) {
    res.status(400).send(error.message);
  }
};


export const get = async (req, res, next) => {
  let forumID = req.params.forumID;
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
  // console.log(filter);
  // try {
  //   const files = await Forum.find(filter);
  //   res.status(200).send(files);
  // } catch (error) {
  //   res.status(400).send(error.message);
  // }
};

export const fileSizeFormatter = (bytes, decimal) => {
  if (bytes === 0) {
    return "0 Bytes";
  }
  const dm = decimal || 2;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "YB", "ZB"];
  const index = Math.floor(Math.log(bytes) / Math.log(1000));
  return (
    parseFloat((bytes / Math.pow(1000, index)).toFixed(dm)) + " " + sizes[index]
  );
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

// ! Tag
// Retrieve and return all products from the const Products.
export const listTag = (req, res) => {
  const filter = req.query.subject;
  console.log(filter);
  if (!filter) {
    Tag.find()
      .then((result) => res.json(result))
      .catch((err) =>
        res.status(500).send({ errors: { global: "Server Error" } })
      );
  } else {
    Tag.find({ listSubject: { $all: [filter] } })
      .then((result) => res.json(result))
      .catch((err) =>
        res.status(500).send({ errors: { global: "Server Error" } })
      );
  }
};

// add new Tag
export const createTag = async (req, res, next) => {
  try {
    Tag.findOne({}, {}, { sort: { createdAt: -1 } }, function (err, _tag) {
      // Set tagID
      let old_id = "";
      if (_tag) old_id = _tag.tagID;
      else old_id = "0";

      let data = req.body;
      data["tagID"] = parseInt(old_id) + 1;

      const tag = new Tag({
        tagID: data["tagID"],
        name: req.body.name,
      });
      tag.save().then(() => {
        res.status(201).send("Files Uploaded Successfully");
      });
    });
  } catch (error) {
    res.status(400).send(error.message);
  }
};
