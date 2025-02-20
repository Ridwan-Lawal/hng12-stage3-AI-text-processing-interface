"use client";

import React from "react";
import { Comment } from "react-loader-spinner";

export default function Spinner() {
  return (
    <div>
      <Comment
        visible={true}
        height="50"
        width="50"
        ariaLabel="comment-loading"
        wrapperStyle={{}}
        wrapperClass="comment-wrapper"
        color="#fff"
        backgroundColor="#1203e6"
      />
    </div>
  );
}
