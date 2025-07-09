import React from 'react';
import { disableChatInput, enableChatInput } from './chatUtils';

const ActionProvider = ({ createChatBotMessage, setState, children }) => {

  const sendUserAndBotMessage = (userText, botText) => {
    const userMessage = createChatBotMessage(userText, { type: 'user' });
    const botMessage = createChatBotMessage(botText);

    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, userMessage, botMessage],
    }));
  };

  // Individual handlers
  const handleHello = () => {
    sendUserAndBotMessage("Здравей", "Здравей! Радвам се да те видя.");
  };

  const handleChooseRobot = () => {
    sendUserAndBotMessage(
      "Какъв робот да избера?",
      "Мога да ти помогна да избереш робот. Кажи ми какъв е твоят дом?"
    );

    enableChatInput();
  };

  const handleRobotIssue = () => {
    sendUserAndBotMessage(
      "Имам проблем с моя робот",
      "Какъв проблем имате с вашия робот?"
    );
    enableChatInput();
  };

  const handleMaintenance = () => {
    sendUserAndBotMessage(
      "Как се поддържа робота?",
      "Поддръжката включва почистване на четки, смяна на филтър и др."
    );
    enableChatInput();
  };

const handleMaintenanceServices = () => {
  const userMessage = createChatBotMessage(
    "Искам до ползвам сервизните услуги на RoboBG",
    { type: "user" }
  );
  const botMessage = createChatBotMessage(
    "Моля, използвай следната информация:",
    {
      widget: "linkWidget",
    }
  );

  setState((prev) => ({
    ...prev,
    messages: [...prev.messages, userMessage, botMessage],
  }));
};

const handleContactTeam = () => {
  const userMessage = createChatBotMessage("Свържи се с екипа", { type: "user" });
  const botMessage = createChatBotMessage(
    "Моля, използвай следната информация:",
    {
      widget: "linkWidget",
    }
  );

  setState((prev) => ({
    ...prev,
    messages: [...prev.messages, userMessage, botMessage],
  }));
};




  return (
    <div>
      {React.Children.map(children, (child) =>
        React.cloneElement(child, {
          actions: {
            handleHello,
            handleChooseRobot,
            handleRobotIssue,
            handleMaintenance,
            handleContactTeam,
            handleMaintenanceServices,
          },
        })
      )}
    </div>
  );
};


export default ActionProvider;
