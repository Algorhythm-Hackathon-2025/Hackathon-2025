import React, { useEffect, useState } from "react";
import "../index.css";
import { Avatar, Button, List, Skeleton } from "antd";
import axios from "axios";
import { App as AntApp } from "antd";

interface DataType {
  _id: string;
  title: string;
  categories: string;
  voteCount: number;
  images?: string[];
  loading?: boolean;
  difficulty: string;
  status?: string; 
}

const PAGE_SIZE = 7;

const App: React.FC = () => {
  const [initLoading, setInitLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<DataType[]>([]);
  const [list, setList] = useState<DataType[]>([]);
  const [page, setPage] = useState(1);
  const { message } = AntApp.useApp();

  const fetchData = async (pageNumber: number): Promise<DataType[]> => {
    try {
      const response = await axios.get("/api/problems/get");
      const allData = response.data;

      const filteredSorted = allData
        .filter((item: DataType) => item.difficulty === "easy")
        .sort((a: DataType, b: DataType) => b.voteCount - a.voteCount);

      const pagedData = filteredSorted.slice(0, pageNumber * PAGE_SIZE);

      const normalizedData = pagedData.map((item: any) => ({
        ...item,
        images: (item.images || []).map(
          (img: any) =>
            `/api/uploads/${img.replace(/\\/g, "/").split("/").pop()}`
        ),
      }));

      return normalizedData;
    } catch (error) {
      console.error("Error fetching data:", error);
      return [];
    }
  };

  const solve = async (id: string) => {
    try {
      const response = await axios.put(`/api/problems/update/${id}`, {
        status: "accepted",
      });
      message.success("Амжилттэй хүлээн авлаа.");
      const updatedList = list.map((item) =>
        item._id === id ? { ...item, status: "accepted" } : item
      );
      setList(updatedList);
    } catch (error) {
      console.error("Failed to update status:", error);
    }
  };

  useEffect(() => {
    fetchData(1).then((res) => {
      setInitLoading(false);
      setData(res);
      setList(res);
    });
  }, []);

  const onLoadMore = () => {
    setLoading(true);
    setList(
      data.concat(
        Array.from({ length: PAGE_SIZE }).map(
          () => ({ loading: true } as DataType)
        )
      )
    );
    const nextPage = page + 1;
    setPage(nextPage);
    fetchData(nextPage).then((res) => {
      setData(res);
      setList(res);
      setLoading(false);
      window.dispatchEvent(new Event("resize"));
    });
  };

  const loadMore =
    !initLoading && !loading ? (
      <div
        style={{
          textAlign: "center",
          marginTop: 12,
          height: 32,
          lineHeight: "32px",
        }}
      >
        <Button onClick={onLoadMore}>load more</Button>
      </div>
    ) : null;

  return (
    <List
      className="demo-loadmore-list"
      loading={initLoading}
      style={{
        backgroundColor: "black",
        height: "650px",
        marginTop: "-9px",
        width: "100%",
      }}
      itemLayout="horizontal"
      loadMore={loadMore}
      dataSource={list}
      renderItem={(item) => (
        <List.Item
          style={{ marginRight: "30px" }}
          actions={[
            item.status === "accepted" ? (
              <Button
                key="accepted"
                type="primary"
                style={{ backgroundColor: "green", borderColor: "green" }}
                disabled
              >
                Хүлээн авсан
              </Button>
            ) : (
              <Button key="solve" onClick={() => solve(item._id)}>
                Ажил авах
              </Button>
            ),
          ]}
        >
          <Skeleton avatar title={false} loading={item.loading} active>
            <List.Item.Meta
              style={{ marginTop: "10px", marginLeft: "20px" }}
              avatar={
                item.images && item.images.length > 0 ? (
                  <Avatar src={item.images[0]} />
                ) : (
                  <Avatar icon="user" />
                )
              }
              title={item.title}
              description={`Category: ${item.categories} | Votes: ${item.voteCount}`}
            />
            <div>{item.difficulty}</div>
          </Skeleton>
        </List.Item>
      )}
    />
  );
};

export default App;
