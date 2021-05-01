import * as mongooseDef from "mongoose";
let mongoose = mongooseDef.default;
const forumSchema = new mongoose.Schema(
  {
    forumID: String,
    userID: String,
    title: String,
    postText: String,
    listSubject: Array,
    listTag: Array,
    listAnswer: Array,
    listComment: Array,
    createTime: Date,
    whoVoteLike: Array,
    whoVoteDislike: Array,
    view: Number,
    isSolution: String,
  },
  { versionKey: false, timestamps: true }
);

let Forum = mongoose.model("Forum", forumSchema, "Forum");
export default Forum;
