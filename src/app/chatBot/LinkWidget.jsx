import React from "react";

const LinkWidget = () => {
  return (
    <div className="custom-link-message">
      <p>
        Свържи се с нашия екип на{" "}
        <a href="mailto:support@example.com">support@example.com</a> или чрез формата за контакт{" "}
        <a href="/contact" target="_blank" rel="noopener noreferrer">
          тук
        </a>.
      </p>
    </div>
  );
};

export default LinkWidget;
