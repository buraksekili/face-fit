import React, { useState, useEffect } from "react";
import ProcessImage from "react-imgpro";
import { loadModels, getFullFaceDescription } from "../faceApi";
import { useIsMount } from "../Custom Hook/useIsMount";

const App = () => {
    const [image, setImage] = useState(null);
    const [detectedFaces, setDetectedFaces] = useState([]);

    const isMount = useIsMount();
    useEffect(() => {
        const checkIsMount = async () => {
            if (isMount) {
                await loadModels();
            } else {
                if (image) {
                    await handleImage();
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
            <input
                type="file"
                multiple={false}
                onClick={() => {
                    setImage(null);
                    setDetectedFaces([]);
                }}
                onChange={(event) => {
                    setImage(URL.createObjectURL(event.target.files[0]));
                }}
            />
            {
                <div>
                    <div>
                        <h1>Your Image</h1>
                    </div>
                    <img
                        id="input-img"
                        src={image ? image : "#"}
                        alt={image ? "face" : ""}
                        style={{ width: "400px", height: "auto" }}
                    ></img>
                </div>
            }
            {image ? (
                <div>
                    <div>
                        <h1>Cropped Image</h1>
                    </div>
                    {detectedFaces.map((detectedFace) => {
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
                    })}
                </div>
            ) : null}
        </div>
    );
};

export default App;
