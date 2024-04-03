import React from "react";
import { Cloudinary } from "@cloudinary/url-gen";

const cld = new Cloudinary({ cloud: { cloudName: "djiyytmot" } });

const TestComponent = () => {
  const imageUrl = cld
    .image(
      "https://collection.cloudinary.com/djiyytmot/2726fa6b004c590f39eeed12dcaa2e17?"
    )
    .resize({ width: 300 })
    .effect("grayscale")
    .toURL();

  return (
    <div>
      <img src={imageUrl} alt="Test Image" />
    </div>
  );
};

export default TestComponent;
