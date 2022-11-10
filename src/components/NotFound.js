import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="notFound">
      <h2>Opps!</h2>
      <h5>404-PAGE NOT FOUND</h5>
      <button>
        <Link to="/">Go To Homepage</Link>
      </button>
    </div>
  );
};

export default NotFound;
