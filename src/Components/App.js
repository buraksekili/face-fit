import React, { useState, useEffect } from "react";
import ProcessImage from "react-imgpro";
import { loadModels, getFullFaceDescription } from "../faceApi";
import { useIsMount } from "../Custom Hook/useIsMount";

const App = () => {
    const isMount = useIsMount();

    useEffect(() => {
        const checkIsMount = async () => {
            if (isMount) {
                await loadModels();
            } else {
                if (image) {
                    await handleImage();
                    setImage(image);
                }
            }
        };
        checkIsMount();
    });

    const [image, setImage] = useState(null);
    const [width, setWidth] = useState(50);
    const [height, setHeight] = useState(50);
    const [x, setX] = useState(0);
    const [y, setY] = useState(0);

    const handleImage = async () => {
        const input = document.getElementById("input-img");
        await getFullFaceDescription(input).then((fullDesc) => {
            const x = fullDesc[0].detection._box.x;
            const y = fullDesc[0].detection._box.y;
            const height = fullDesc[0].detection._box.height;
            const width = fullDesc[0].detection._box.width;
            setX(x);
            setY(y);
            setHeight(height);
            setWidth(width);
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
                <img
                    id="input-img"
                    src={image ? image : "#"}
                    alt={image ? "face" : ""}
                ></img>
            }
            {image ? (
                <div>
                    <ProcessImage
                        image={image}
                        crop={{ width, height, x, y }}
                    />
                </div>
            ) : null}

            <div>
                <span>Height: </span>
                <input
                    value={height}
                    type="number"
                    onChange={(e) => setHeight(parseInt(e.target.value))}
                />

                <span style={{ marginLeft: "10px" }}>Width: </span>
                <input
                    value={width}
                    type="number"
                    onChange={(e) => setWidth(parseInt(e.target.value))}
                />
            </div>
        </div>
    );
};

export default App;
