import React from "react";

const CustomBotMessage = ({ message }) => {
  const contactText =
    "Моля свържете се с екипа на support@example.com или чрез формата за контакт тук за повече информация.";

  const isContactMessage = message === contactText;

  if (isContactMessage) {
    return (
      <div className="react-chatbot-kit-chat-bot-message" style={{backgroundColor:"#454d55"}}>
        <span>
          Моля свържете се с екипа на{" "}
          <a href="mailto:support@example.com">support@example.com</a> или чрез формата за контакт{" "}
          <a href="/contact" target="_blank" rel="noopener noreferrer">
            тук
          </a>{" "}
          за повече информация.
        </span>
        <div
          className="react-chatbot-kit-chat-bot-message-arrow"
          style={{ borderRightColor: "#454d55" }}
        />
      </div>
    );
  }

  // Default rendering for all other bot messages
  return (
    <div className="react-chatbot-kit-chat-bot-message" style={{backgroundColor:"#454d55"}}>
      <span>{message}</span>
      <div
        className="react-chatbot-kit-chat-bot-message-arrow"
        style={{ borderRightColor: "#454d55" }}
      />
    </div>
  );
};

export default CustomBotMessage;
