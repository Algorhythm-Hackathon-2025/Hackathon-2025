import React, { useState, useEffect } from "react";
import { useRequest } from "ahooks";
import { message } from "antd";

interface ImageSliderProps {
  images: string[];
  title: string;
  id: string;
}

const ImageSlider: React.FC<ImageSliderProps> = ({ images, title, id }) => {
  const [current, setCurrent] = useState(0);
  const [voted, setVoted] = useState(false);
  const [voteCount, setVoteCount] = useState<number | null>(null);

  const { data: user, loading: userLoading, error: userError } = useRequest(async () => {
    const response = await fetch('/api/user/profile', {
      method: 'GET',
      credentials: 'include',
    });
    if (!response.ok) throw new Error('Failed to fetch user data');
    return await response.json(); 
  });

  const fetchVoteCount = async () => {
    const response = await fetch(`/api/problems/voteCount/${id}`, {
      method: "GET",
      credentials: "include",
    });
    if (response.ok) {
      const data = await response.json();
      setVoteCount(data.voteCount);
    }
  };

  useEffect(() => {
    if (id) {
      fetchVoteCount();
    }
  }, [id]);

  if (userLoading) {
    return <div>Loading...</div>;
  }

  if (userError) {
    return <div>Error: {userError.message}</div>;
  }

  if (!user) {
    return <div>Error: User data is not available</div>;
  }

  const isAdmin = user.isAdmin;

  const prev = () => setCurrent(current === 0 ? images.length - 1 : current - 1);
  const next = () => setCurrent(current === images.length - 1 ? 0 : current + 1);

  const vote = async () => {
    try {
      const response = await fetch(`/api/problems/vote/${id}`, {
        method: "POST",
        credentials: "include",
      });

      if (!response.ok) throw new Error("Vote failed");

      setVoted(true);
      fetchVoteCount(); 
      message.success("Thanks for voting!");
    } catch (error) {
      console.error("Voting error:", error);
      alert("Failed to vote. Try again.");
    }
  };

  return (
    <div style={{ width: "200px" }}>
      <h4 style={{ fontWeight: "bold", marginBottom: "8px", fontSize: "15px" }}>
        {title}
      </h4>
      <div style={{ position: "relative" }}>
        <img
          src={images[current]}
          alt="Problem"
          style={{
            width: "100%",
            height: "auto",
            objectFit: "cover",
            borderRadius: "4px",
            transition: "all 0.3s ease-in-out", 
          }}
        />
        {images.length > 1 && (
          <>
            <button
              onClick={prev}
              style={{
                position: "absolute",
                left: -23,
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
                right: -23,
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
      {isAdmin ? (
        <div style={{ marginTop: "8px", fontSize: "12px", color: "#555" }}>
          <span>Votes: {voteCount ?? 0}</span>
        </div>
      ) : (
        <button
          onClick={vote}
          disabled={voted}
          style={{
            marginTop: "8px",
            width: "100%",
            padding: "6px",
            backgroundColor: voted ? "#d3d3d3" : "#ADD8E6",
            color: "#000",
            border: "none",
            borderRadius: "4px",
            cursor: voted ? "not-allowed" : "pointer",
            fontWeight: "bold",
          }}
        >
          {voted ? "Voted" : "Vote"}
        </button>
      )}
    </div>
  );
};

export default ImageSlider;
