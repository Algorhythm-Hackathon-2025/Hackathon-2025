import React, { useState } from "react";

interface ImageSliderProps {
  images: string[];
  title: string;
}

const ImageSlider: React.FC<ImageSliderProps> = ({ images, title }) => {
  const [current, setCurrent] = useState(0);

  // Log images array to check its content
  console.log(images); // Check the actual images array

  const prev = () => setCurrent(current === 0 ? images.length - 1 : current - 1);
  const next = () => setCurrent(current === images.length - 1 ? 0 : current + 1);

  return (
    <div style={{ width: "200px" }}>
      <h4 style={{ fontWeight: "bold", marginBottom: "8px" }}>{title}</h4>
      <div style={{ position: "relative" }}>
        <img
          src={images[current]}
          alt="Problem"
          style={{
            width: "100%",
            height: "120px",
            objectFit: "cover",
            borderRadius: "4px",
          }}
        />
        {images.length > 1 && (
          <>
            <button
              onClick={prev}
              style={{
                position: "absolute",
                left: 0,
                top: "50%",
                transform: "translateY(-50%)",
                background: "#0008",
                color: "#fff",
                border: "none",
                padding: "2px 6px",
                cursor: "pointer",
              }}
            >
              ◀
            </button>
            <button
              onClick={next}
              style={{
                position: "absolute",
                right: 0,
                top: "50%",
                transform: "translateY(-50%)",
                background: "#0008",
                color: "#fff",
                border: "none",
                padding: "2px 6px",
                cursor: "pointer",
              }}
            >
              ▶
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default ImageSlider;
