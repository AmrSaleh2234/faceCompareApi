const path = require("path");
// import * as canvas from 'canvas';
// const { Canvas, Image, ImageData } = canvas

const faceapi = require("./face-api.min")
const {promises} = require("fs");
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
    await faceapi.nets.faceRecognitionNet.loadFromDisk(modelPath);
    await faceapi.nets.faceLandmark68Net.loadFromDisk(modelPath);
    await faceapi.nets.ssdMobilenetv1.loadFromDisk(modelPath);


    // const labels = ['Black Widow', 'Captain America', 'Captain Marvel', 'Hawkeye', 'Jim Rhodes', 'Thor', 'Tony Stark']c
    //
    // var fs = require('fs');
    // var imgBase64= "data:image/jpeg;base64,"+fs.readFileSync('./upload/2.jpg', 'base64')
    // const cheerio = require('cheerio');
    // const $ = cheerio.load(`<img id="img" src="${imgBase64}" >`);
    const request = require('request');

    request('http://127.0.0.1:3000/', async function (error, response, body) {

        // const detections = await faceapi.detectAllFaces(body).withFaceLandmarks().withFaceDescriptors()
        console.log(typeof body)
    });
    // console.log( )

    // console.log(imgBase64)

    return true;
}

module.exports = {
    detect: main,
};