import React from "react";

const CustomLinkMessage = ({ message }) => {
  // You can add optional fallback text or use message.message if needed
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

export default CustomLinkMessage;
