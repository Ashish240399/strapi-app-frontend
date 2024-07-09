import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const HomeRedirect = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("jwt-token");
    if (token) {
      navigate("/chat");
    } else {
      navigate("/auth/login");
    }
  }, [navigate]);

  return null;
};

export default HomeRedirect;
