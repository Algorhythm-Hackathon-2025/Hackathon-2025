import React, { useState } from "react";
import upBlue from "/img/up-blue.png";
import upBlack from "/img/up-black.png";
import downRed from "/img/down-red.png";
import downBlack from "/img/down-black.png";
import { Avatar, Card, Carousel } from "antd";
// import Comment from "/img/comment.png";

const { Meta } = Card;

interface PostProps {
  small?: boolean;
  title?: string;
  imageUrls?: string[];
}

const Post: React.FC<PostProps> = ({
  small = false,
  title,
  imageUrls = [],
}) => {
  const [activeButton, setActiveButton] = useState<"up" | "down">("down");

  const handleButtonClick = (button: "up" | "down") => {
    setActiveButton(button);
  };

  const defaultImages = [
    "https://images.unsplash.com/photo-1605460375648-278bcbd579a6",
  ];
  const imageList = imageUrls.length > 0 ? imageUrls : defaultImages;
  console.log("imageList", imageList);
  return (
    <Card
      style={{
        width: small ? 250 : 800,
        margin: small ? "0 auto" : "auto",
      }}
      cover={
        <Carousel>
          {imageList.map((url, idx) => (
            <div key={idx}>
              <img
                src={url}
                alt={`photo-${idx}`}
                style={{
                  width: "100%",
                  height: small ? "150px" : "350px",
                  objectFit: "cover",
                  borderTopLeftRadius: "8px",
                  borderTopRightRadius: "8px",
                }}
              />
            </div>
          ))}
        </Carousel>
      }
      actions={
        small
          ? undefined
          : [
              <button
                key="up"
                onClick={() => handleButtonClick("up")}
                style={{ border: "none", padding: "10px", cursor: "pointer" }}
              >
                <img
                  src={activeButton === "up" ? upBlue : upBlack}
                  alt="Up Button"
                  style={{ width: 24, height: 24 }}
                />
              </button>,
              <button
                key="down"
                onClick={() => handleButtonClick("down")}
                style={{ border: "none", padding: "10px", cursor: "pointer" }}
              >
                <img
                  src={activeButton === "down" ? downRed : downBlack}
                  alt="Down Button"
                  style={{ width: 24, height: 24 }}
                />
              </button>,
            ]
      }
    >
      <Meta
        avatar={
          <Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=8" />
        }
        title={title || "Card title"}
        description={
          small
            ? "Short description"
            : "This is the longer description for the full-sized post card."
        }
      />
    </Card>
  );
};

export { Post };
