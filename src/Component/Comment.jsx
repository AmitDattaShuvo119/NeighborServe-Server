import React, { useState, useEffect } from "react";
import { persons } from "./profileComponent/persons";
import "../styles/Comment.css";

const Comment = ({ reviewer, reviewerImg, date, review }) => {
  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "5%",
          marginLeft: "2%",
          alignItems: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            width: "60%",
          }}
        >
          <img
            className="rounded-sm"
            src={reviewerImg}
            alt=""
            style={{ height: "30px", width: "30px", marginLeft: "1%" }}
          />
          <p
            style={{
              marginLeft: "2%",
              color: "black",
              marginTop: "-1.5%",
              fontSize: "15px",
            }}
          >
            {reviewer}
          </p>
          <img
            src="vip.png"
            alt=""
            style={{
              height: "15px",
              width: "15px",
              marginLeft: "2%",
            }}
          />
        </div>
        <p
          style={{
            color: "#B6B6B9",
            fontSize: "12px",
            // marginLeft: "12.5%",
            marginRight: "10px",
          }}
        >
          {date}
        </p>
      </div>
      <p
        style={{
          color: "#766C6C",
          fontSize: "12px",
          marginLeft: "2.5%",
        }}
      >
        {review}
      </p>
    </div>
  );
};

const CommentList = ({ userReviews }) => {
  if (!userReviews) {
    return <p style={{textAlign:"center"}}>No reviews yet</p>;
  }

  const [index1, setIndex1] = useState(0);
  const [page, setPage] = useState(1);
  const reviewsPerPage = 6;
  const pageLimit = Math.ceil(userReviews.length / reviewsPerPage);

  useEffect(() => {
    setIndex1((page - 1) * reviewsPerPage);
  }, [page]);

  const sortedReviews = [...userReviews].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );

  return (
    <div>
      {sortedReviews.slice(index1, index1 + reviewsPerPage).map((review) => (
        <Comment
          key={review.reviewId}
          reviewer={review.reviewerName}
          reviewerImg={review.reviewerImg}
          date={review.date}
          review={review.review}
        />
      ))}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
          marginTop: "10px",
          marginBottom: "10px",
          padding: "0 10px",
          boxSizing: "border-box",
        }}
      >
        {page > 1 && (
          <button className="c-btn-round" onClick={() => setPage(page - 1)}>
            <img src="./prev.svg" alt="" />
          </button>
        )}
        <div style={{ marginLeft: "auto" }}>
          {page < pageLimit && (
            <button className="c-btn-round" onClick={() => setPage(page + 1)}>
              <img src="./next.svg" alt="" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CommentList;
