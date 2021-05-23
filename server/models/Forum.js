import * as mongooseDef from "mongoose";
let mongoose = mongooseDef.default;
const forumSchema = new mongoose.Schema(
  {
    // forumID: {
    //   type: String,
    //   unique: true,
    // },
    // userID: {
    //   type: String,
    //   required: true,
    //   unique: true,
    // },
    title: {
      type: String,
      required: true,
    },
    postText: {
      type: String,
      required: true,
    },
    listImage: Array,
    listSubject: Array,
    listTag: Array,
    listAnswer: Array,
    listComment: Array,
    whoVoteLike: Array,
    whoVoteDislike: Array,
    view: Number,
    isSolution: String,
  },
  { versionKey: false, timestamps: true }
);

let Forum = mongoose.model("Forum", forumSchema, "Forum");
export default Forum;
