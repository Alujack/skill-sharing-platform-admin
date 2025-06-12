import React from "react";

const Card= ({ children, className = "" }) => {
  return (
    <div className={`p-4 bg-gray-800 rounded-lg shadow-lg ${className}`}>
      {children}
    </div>
  );
};

export default Card;
