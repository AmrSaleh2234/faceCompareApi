const path = require("path");


// const faceapi = require("@vladmandic/face-api/dist/face-api.node.js");
const faceapi = require("./face-api.min")
const modelPathRoot = "./models";

let optionsSSDMobileNet;

async function image(file) {
    const decoded = tf.node.decodeImage(file);
    const casted = decoded.toFloat();
    const result = casted.expandDims(0);
    decoded.dispose();
    casted.dispose();
    return result;
}

async function detect(tensor) {
    const result = await faceapi.detectAllFaces(tensor, optionsSSDMobileNet);
    return result;
}

async function main(file) {

    console.log("Loading FaceAPI models");
    const modelPath = path.join(__dirname, modelPathRoot);
    await faceapi.nets.ssdMobilenetv1.loadFromDisk(modelPath);



    return true;
}

module.exports = {
    detect: main,
};