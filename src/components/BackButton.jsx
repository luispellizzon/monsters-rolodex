import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

function BackButton({ url }) {
  const navigate = useNavigate();

  const onClick = () => {
    navigate("/");
  };

  return (
    <button className="btn btn-left" onClick={onClick}>
      <FaArrowLeft />
      Back Home
    </button>
  );
}

export default BackButton;
