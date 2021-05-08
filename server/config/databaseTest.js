'use strict';
import mongoose from "mongoose";

const mongooseConnect = () => {
    mongoose.connect('mongodb://127.0.0.1:27017/thaiegghead', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: true,
    }).then(() => console.log('Connected to Mongodb......'));
}
export default mongooseConnect;