import React from "react";
import { Avatar, Button, Card, Carousel, Tooltip } from "antd";
import { ArrowDownOutlined, ArrowUpOutlined } from "@ant-design/icons";

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
  status?: "pending" | "accepted" | "rejected" | "done";
}

const getStatusText = (status: PostProps["status"]) => {
  switch (status) {
    case "pending":
      return (
        <div className="flex items-center text-yellow-500 text-sm">
          <span>Pending</span>
        </div>
      );
    case "accepted":
      return (
        <div className="flex items-center text-blue-500 text-sm">
          <span>Accepted</span>
        </div>
      );
    case "rejected":
      return (
        <div className="flex items-center text-red-500 text-sm">
          <span>Rejected</span>
        </div>
      );
    case "done":
      return (
        <div className="flex items-center text-green-600 text-sm">
          <span>Done</span>
        </div>
      );
    default:
      return null;
  }
};

const Post: React.FC<PostProps> = ({
  small = false,
  title,
  imageUrls = [],
  voteSum,
  voting,
  selfVote,
  status,
  onUpvote,
  onDownvote,
}) => {
  const defaultImages = [
    "https://images.unsplash.com/photo-1605460375648-278bcbd579a6",
  ];
  const imageList = imageUrls.length > 0 ? imageUrls : defaultImages;

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
      <div className="flex gap-4 items-center justify-end mt-4">
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
        />
        <span className="text-gray-500">{voteSum}</span>
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
        />
        {status && <div key="status">{getStatusText(status)}</div>}
      </div>
    </Card>
  );
};

export { Post };
