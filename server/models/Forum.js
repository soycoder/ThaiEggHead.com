import * as mongooseDef from "mongoose";
let mongoose = mongooseDef.default;
const forumSchema = new mongoose.Schema(
  {
    forumID: {
      type: String,
      unique: true,
    },
    userID: {
      type: String,
      // required: true,
      // unique: true,
    },
    title: {
      type: String
    },
    postText: {
      type: String
    },
    listImage: Array,
    listSubject: Array,
    listTag: Array,
    listAnswer: Array,
    listComment: Array,
    whoVoteLike: Array,
    view: Number,
    isSolution: String,
  },
  { versionKey: false, timestamps: true }
);

let Forum = mongoose.model("Forum", forumSchema, "Forum");
export default Forum;
