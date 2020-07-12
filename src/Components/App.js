import React, { useState, useEffect } from "react";
import ProcessImage from "react-imgpro";
import { loadModels, getFullFaceDescription } from "../faceApi";
import { useIsMount } from "../Custom Hook/useIsMount";
import "./App.css"


const App = () => {
    const isMount = useIsMount();

    useEffect(() => {
        const checkIsMount = async () => {
            if (isMount) {
                console.log("First Render");
                await loadModels();
            } else {
                if (image) {
                    console.log("image is ready as: ", image);
                    await handleImage(image);
                    console.log("image is ready as1: ", image);
                    setImage(image);
                } else {
                    console.log("i am sorry boy");
                }
            }
        };
        checkIsMount();
    });

    const [image, setImage] = useState(null);
    const [detectedFaces, setDetectedFaces] = useState([])


    const handleImage = async (image) => {
        console.log("handleImage");
        console.log("image: ", image);
        const input = document.getElementById("input-img");
        console.log("input: ", input);
        await getFullFaceDescription(input).then((fullDesc) => {
            console.log("handleImage1");
            setDetectedFaces(fullDesc)
        });
    };

    return (
        <div>
            <input
                type="file"
                onChange={(event) => {
                    console.log(event.target.files[0]);
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
                        style={{width:"1200px", height:"auto"}}
                    ></img>

                    
                </div>
            }
            {image ? (
                <div>
                    <div>
                        <h1>Cropped Image</h1>
                    </div>
                    <ul>
                        {detectedFaces.map(function(detectedFace, index){

                                       
                            let width =  detectedFace.detection._box.width;
                            let height =  detectedFace.detection._box.height;
                            let x =  detectedFace.detection._box.x;
                            let y =  detectedFace.detection._box.y;

                            return <ProcessImage
                                    image={image}

                                    crop={{
                                        width,
                                        height,
                                        x,
                                        y                                        
                                    }}
                                />
                        })}
                    </ul>
                </div>
            ) : null}
        </div>
    );
};

export default App;
