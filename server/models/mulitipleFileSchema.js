import mongoose from "mongoose";

const Schema = mongoose.Schema;

const mulitipleFileSchema = new Schema({
    forumID: {
        type: String
    },
    userID: {
        type: String
    },
    title: {
        type: String
    },
    postText: {
        type: String
    },
    listTag: {
        type: String
    },
    listSubject: {
        type: String
    },
    listImage: [Object], // รูป 

    listAnswer: {
        type: String
    },
    listComment: {
        type: String
    },
    whoVoteLike: {
        type: String
    },
    whoVoteDislike: {
        type: String
    },
    view: {
        type: Number
    },
    isSolution: {
        type: String
    },
    

}, {timestamps: true});

// module.exports 
let Forum = mongoose.model('MultipleFile', mulitipleFileSchema);
export default Forum;