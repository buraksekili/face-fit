// credits: https://towardsdatascience.com/facial-recognition-spa-for-bnk48-idol-group-using-react-and-face-api-js-ad62b43ec5b6
import * as faceapi from "face-api.js";

// Load models and weights
export async function loadModels() {
    const MODEL_URL = process.env.PUBLIC_URL + "/models";

    try {
        console.log(`MODEL URL ${MODEL_URL}`);
        await faceapi.loadTinyFaceDetectorModel(MODEL_URL);
        console.log("load models1");
        await faceapi.loadFaceLandmarkTinyModel(MODEL_URL);
        console.log("load models2");
        await faceapi.loadFaceRecognitionModel(MODEL_URL);
        console.log("load models3");
    } catch (error) {
        console.log(error.message);
    }
}

export async function getFullFaceDescription(blob, inputSize = 512) {
    console.log("getfullfacedescr");
    let scoreThreshold = 0.5;
    const OPTION = new faceapi.TinyFaceDetectorOptions({
        inputSize,
        scoreThreshold,
    });
    const useTinyModel = true;
    console.log("blob: ", blob.src);
    try {
        let img = await faceapi.fetchImage(blob.src);
        let fullDesc = await faceapi
            .detectAllFaces(img, OPTION)
            .withFaceLandmarks(useTinyModel)
            .withFaceDescriptors();
        return fullDesc;
    } catch (error) {
        console.log("error: ", error.message);
    }
}
