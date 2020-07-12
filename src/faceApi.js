// credits: https://towardsdatascience.com/facial-recognition-spa-for-bnk48-idol-group-using-react-and-face-api-js-ad62b43ec5b6
import * as faceapi from "face-api.js";

/**
 * This function loads models from local folder
 */
export async function loadModels() {
    const MODEL_URL = process.env.PUBLIC_URL + "/models";

    try {
        await faceapi.loadTinyFaceDetectorModel(MODEL_URL);
        await faceapi.loadFaceLandmarkTinyModel(MODEL_URL);
        await faceapi.loadFaceRecognitionModel(MODEL_URL);
    } catch (error) {
        console.log(error.message);
    }
}

/**
 * This function detects a face within given image
 * @return {Object} Consists of all information about detected image.
 */
export async function getFullFaceDescription(blob, inputSize = 512) {
    let scoreThreshold = 0.5;
    const OPTION = new faceapi.TinyFaceDetectorOptions({
        inputSize,
        scoreThreshold,
    });
    const useTinyModel = true;
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
