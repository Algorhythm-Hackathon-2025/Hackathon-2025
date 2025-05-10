import React, { useState } from "react";
import upBlue from "/img/up-blue.png";
import upBlack from "/img/up-black.png";
import downRed from "/img/down-red.png";
import downBlack from "/img/down-black.png";
import { Avatar, Card } from "antd";
import Comment from "/img/comment.png";

const { Meta } = Card;

const Post: React.FC = () => {
  // State to manage which button is clicked
  const [activeButton, setActiveButton] = useState<"up" | "down">("down");

  // Function to toggle the active button
  const handleButtonClick = (button: "up" | "down") => {
    setActiveButton(button);
  };

  return (
    <Card
      style={{ width: 300 }}
      cover={
        <img
          alt="example"
          src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
        />
      }
      actions={[
        // Button 1: Up Button
        <button
          key="up"
          onClick={() => handleButtonClick("up")}
          style={{
            border: "none",
            padding: "10px",
            cursor: "pointer",
          }}
        >
          <img
            src={activeButton === "up" ? upBlue : upBlack}
            alt="Up Button"
            style={{ width: 24, height: 24 }}
          />
        </button>,

        <button
          style={{
            border: "none",
            padding: "10px",
            cursor: "pointer",
          }}
        >
          <img
            src={activeButton === "up" ? Comment : Comment}
            alt="Up Button"
            style={{ width: 28, height: 28 }}
          ></img>
        </button>,
        // Button 2: Down Button
        <button
          key="down"
          onClick={() => handleButtonClick("down")}
          style={{
            border: "none",
            padding: "10px",
            cursor: "pointer",
          }}
        >
          <img
            src={activeButton === "down" ? downRed : downBlack}
            alt="Down Button"
            style={{ width: 24, height: 24 }}
          />
        </button>,
      ]}
    >
      <Meta
        avatar={
          <Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=8" />
        }
        title="Card title"
        description="This is the description"
      />
    </Card>
  );
};

export { Post };
