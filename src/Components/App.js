import React, { useState, useEffect } from "react";
import ProcessImage from "react-imgpro";
import { loadModels, getFullFaceDescription } from "../faceApi";
import { useIsMount } from "../Custom Hook/useIsMount";
import Loading from "./Loading";
import "./App.css";

const App = () => {
    const [image, setImage] = useState(null);
    const [detectedFaces, setDetectedFaces] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const isMount = useIsMount();
    useEffect(() => {
        const checkIsMount = async () => {
            if (isMount) {
                setIsLoading(true);
                await loadModels();
                setIsLoading(false);
            } else {
                if (image) {
                    setIsLoading(true);
                    await handleImage();
                    setIsLoading(false);
                }
            }
        };
        checkIsMount();
    }, [image]);

    const handleImage = async () => {
        const input = document.getElementById("input-img");
        await getFullFaceDescription(input).then((fullDesc) => {
            setDetectedFaces(fullDesc);
        });
    };

    return (
        <div>
            {isLoading ? (
                <Loading />
            ) : (
                <div className="app-container">
                    <div>
                        <label for="img-input" className="img-input-label">
                            Choose a photo.
                        </label>
                        <input
                            style={{ display: "none" }}
                            type="file"
                            id="img-input"
                            accept="image/*"
                            multiple={false}
                            onClick={() => {
                                setImage(null);
                                setDetectedFaces([]);
                            }}
                            onChange={(event) => {
                                setImage(
                                    URL.createObjectURL(event.target.files[0])
                                );
                            }}
                        />
                    </div>
                    <img
                        id="input-img"
                        src={image ? image : "#"}
                        alt={image ? "face" : ""}
                        className="input-image"
                    ></img>
                    {image ? (
                        <div className="output-image">
                            {detectedFaces.length > 0 ? (detectedFaces.map((detectedFace) => {
                                let width = detectedFace.detection._box.width;
                                let height = detectedFace.detection._box.height;
                                let x = detectedFace.detection._box.x;
                                let y = detectedFace.detection._box.y;

                                return (
                                        <ProcessImage
                                            image={image}
                                            crop={{ width, height, x, y }}
                                        />
                                );
                            })):
                            <h1>Face Not Found</h1>}
                        </div>
                    ) : null}
                </div>
            )}
        </div>
    );
};

export default App;
