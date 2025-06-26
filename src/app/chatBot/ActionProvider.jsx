import React from 'react';

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
  };

  const handleRobotIssue = () => {
    sendUserAndBotMessage(
      "Имам проблем с моя робот",
      "Какъв проблем имаш с твоя робот?"
    );
  };

  const handleMaintenance = () => {
    sendUserAndBotMessage(
      "Как се поддържа робота?",
      "Поддръжката включва почистване на четки, смяна на филтър и др."
    );
  };

  const handleContactTeam = () => {
    sendUserAndBotMessage(
      "Свържи се с екипа",
      "Свържи се с нашия екип на support@example.com или чрез формата за контакт."
    );
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
          },
        })
      )}
    </div>
  );
};

export default ActionProvider;
