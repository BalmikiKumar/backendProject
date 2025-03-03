//npm start for run this backend
import express from "express"
import dotenv from "dotenv"
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
 
import { v2 as cloudinary } from "cloudinary";
import userRoute from "./routes/user.route.js";
import courseRoute from "./routes/course.route.js";
import adminRoute from "./routes/admin.route.js";

import fileUpload from "express-fileupload";

//nothing use here
import { updateCourse } from "./controllers/course.controller.js";

const app = express();
dotenv.config();

//middleware
app.use(express.json());
app.use(cookieParser());

app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: '/tmp/'
}));

const port = process.env.PORT || 3000;
const DB_URI = process.env.MONGO_URI;
 
try {
    await mongoose.connect(DB_URI);
    console.log("Databse connected")
}
catch (error) {
    console.log("can't connect to db")
}

app.get("/", (req, res) => {
    res.send("ON landing page");
    console.log("in console.")
})

//defining routes
app.use("/api/v1/course", courseRoute);
app.use("/api/v1/user", userRoute);
app.use("/api/v1/admin", adminRoute);

//nothing use here
// app.use("/api/v1/update:courseId", updateCourse);


// Configuration
cloudinary.config({
    cloud_name: process.env.cloud_name,
    api_key: process.env.api_key,
    api_secret: process.env.api_secret
});
console.log("cloudinary response ")

app.listen(port, () => {
    console.log(`Server is listening on Port no : http://localhost:${port}`)
});


