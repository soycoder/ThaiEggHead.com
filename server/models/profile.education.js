import * as mongooseDef from "mongoose";
let mongoose = mongooseDef.default;
const profileEducationSchema = new mongoose.Schema(
  {
    educationID: String,
    name: String,
    site: String,
    imgURL: String,
    since: String,
    followers: Number,
  },
  { versionKey: false, timestamps: true }
);

let profileEducation = mongoose.model(
  "profile.education",
  profileEducationSchema,
  "profile.education"
);
export default profileEducation;
