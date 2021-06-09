import React from "react";

const ContentA = ({title, description, image}) => {
  return (
    <div className="content">
      <div className="case-1">
        <h1 className="title-desc">{title}</h1>
        <p className="desc">
         {description}
        </p>
      </div>
      <div className="case-2">
        <img src={image} alt="img" />
      </div>
    </div>
  );
};

export { ContentA };
