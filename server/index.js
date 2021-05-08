// 'use strict';
import express from "express";
import path from "path";
import cors from "cors";
import fileRoutes from "./routes/file-upload-routes.js";

const port = process.env.PORT || 8080;
const app = express();
app.use(cors());

import mongooseConnect from "./config/databaseTest.js";
mongooseConnect();

app.use('/uploads', express.static(path.join('uploads')));

app.use('/api', fileRoutes.routes);

app.listen(port, () => console.log(`server is listening on url http://localhost:${port}`));