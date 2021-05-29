import * as mongooseDef from "mongoose";
let mongoose = mongooseDef.default;
const tagSchema = new mongoose.Schema(
  {
    tagID: {
      type: String,
    },
    name: {
      type: String,
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

let Tag = mongoose.model("Tag", tagSchema, "Tag");
export default Tag;
