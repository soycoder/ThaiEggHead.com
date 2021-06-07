import * as mongooseDef from "mongoose";
let mongoose = mongooseDef.default;
const commentSchema = new mongoose.Schema(
  {
    commentID: String,
    answerID: String,
    userID: String,
    commentText: String,
    createTime: Date,
  },
  { versionKey: false, timestamps: true }
);

let Comment = mongoose.model("Comment", commentSchema, "Comment");
export default Comment;
