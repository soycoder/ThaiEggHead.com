import * as mongooseDef from "mongoose";
let mongoose = mongooseDef.default;
const answerSchema = new mongoose.Schema(
  {
    answerID: String,
    userID: String,
    forumID: String,
    answerText: String,
    listComment: Array,
    whoVoteLike: Array,
    whoVoteDislike: Array,
  },
  { versionKey: false, timestamps: true }
);

let Answer = mongoose.model("Answer", answerSchema, "Answer");
export default Answer;
