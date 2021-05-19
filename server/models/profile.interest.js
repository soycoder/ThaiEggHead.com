import * as mongooseDef from "mongoose";
let mongoose = mongooseDef.default;
const profileInterestSchema = new mongoose.Schema(
  {
    interestID: String,
    name: String,
    site: String,
    imgURL: String,
    since: String,
    followers: Number,
  },
  { versionKey: false, timestamps: true }
);

let profileInterest = mongoose.model(
  "profile.interest",
  profileInterestSchema,
  "profile.interest"
);
export default profileInterest;
