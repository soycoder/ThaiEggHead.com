import mongoose from "mongoose";

const Schema = mongoose.Schema;

const mulitipleFileSchema = new Schema({
    title: {
        type: String
    },
    body: {
        type: String
    },
    tag: {
        type: String
    },
    subject: {
        type: String
    },
    files: [Object]
}, {timestamps: true});

// module.exports 
let Forum = mongoose.model('MultipleFile', mulitipleFileSchema);
export default Forum;