const express = require("express");
const fileUpload = require("express-fileupload");
// const faceapi = require("./face-api.min")
const app = express();
const port = process.env.PORT || 3000;
const faceApiService =require('./faceapiService')
app.use(fileUpload());

app.post("/upload", async (req, res) => {
    const { file } = req.files;

    const result = await faceApiService.detect(file.data);

    console.log(file);
    res.send("Successfile upload");

});



app.listen(port, () => {
    console.log("Server started on port" + port);
});