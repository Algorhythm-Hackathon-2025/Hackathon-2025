import React from "react";
import { Avatar, Button, Card, Carousel } from "antd";
import { ArrowDownOutlined, ArrowUpOutlined } from "@ant-design/icons";
// import Comment from "/img/comment.png";

const { Meta } = Card;

interface PostProps {
  small?: boolean;
  title?: string;
  imageUrls?: string[];
  voteSum: number;
  selfVote?: "up" | "down";
  voting?: boolean;
  onUpvote?: () => void;
  onDownvote?: () => void;
}

const Post: React.FC<PostProps> = ({
  small = false,
  title,
  imageUrls = [],
  voteSum,
  voting,
  selfVote,
  onUpvote,
  onDownvote,
}) => {
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
        <Carousel arrows infinite={false}>
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
      <div className="flex gap-4 items-center justify-end">
        <Button
          key="up"
          loading={voting}
          onClick={() => onUpvote?.()}
          type="text"
          icon={
            <ArrowUpOutlined
              style={{ color: selfVote === "up" ? "green" : "gray" }}
            />
          }
          size="small"
        ></Button>
        <span className="text-gray-300">{voteSum}</span>
        <Button
          key="down"
          loading={voting}
          onClick={() => onDownvote?.()}
          type="text"
          icon={
            <ArrowDownOutlined
              style={{ color: selfVote === "down" ? "red" : "gray" }}
            />
          }
          size="small"
        ></Button>
      </div>
    </Card>
  );
};

export { Post };
