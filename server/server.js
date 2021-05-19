import express from "express";
import logger from "morgan";
import path from "path";
import cors from "cors";
import mongooseDbConnect from "./config/database.js";

import { default as user } from "./routes/UserRouter.js";
import { default as forum } from "./routes/ForumRouter.js";
import { default as answer } from "./routes/AnswerRouter.js";
import { default as comment } from "./routes/CommentRouter.js";
import { default as interest } from "./routes/Profile.InterestRouter.js";

function errorHandler(err, req, res, next) {
  if (res.headersSent) {
    return next(err);
  }
  res.status(500).json({ error: err });
}

var app = express();
// app.use("/public", express.static(path.join(process.cwd(), "public")));
app.use(logger("short"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors())
app.use(errorHandler);
mongooseDbConnect();


// REST for user
app.use("/users", user);
// REST for forum
app.use("/forums", forum);
// REST for answer
app.use("/answers", answer);
// REST for comment
app.use("/comments", comment);

// REST for Profile/interest
app.use("/profile/interest", interest);


app.get("/", (req, res) => {
  res.send("Invalid Endport");
});
// app.get("*", (req, res) => {
//   res.sendFile(path.join(process.cwd(), "public/index.html"));
// });
app.get("/", (req, res) => res.status(404).send("Not Found"));
app.use("/*", (req, res) => res.status(422).send("Unsupported path entity"));

// require('./config/databaseTest')();
app.use('/uploads', express.static(path.join('uploads')));
// app.use('/api', fileRoutes);

const port = process.env.PORT || 5000;
app.listen(port, function () {
  console.log(`start http server on ${port}`);
});
