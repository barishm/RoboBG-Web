import React from 'react';
import { disableChatInput, enableChatInput } from './chatUtils';
import {
  CONTACT_MESSAGE,
  CHOOSE_ROBOT_MESSAGE,
  ROBOT_ISSUE_MESSAGE,
  ROBOT_MAINTENANCE_MESSAGE,
  ROBOBG_SERVICES_MESSAGE,
  CONTACT_MESSAGE_RESPONSE,
  CHOOSE_ROBOT_MESSAGE_RESPONSE,
  ROBOT_ISSUE_MESSAGE_RESPONSE,
  ROBOT_MAINTENANCE_MESSAGE_RESPONSE
} from '../../constants';


let interactionStarted = false;

const ActionProvider = ({ createChatBotMessage, setState, children, state }) => {

  const sendUserAndBotMessage = (userText, botText) => {
    const userMessage = createChatBotMessage(userText, { type: 'user' });
    const botMessage = createChatBotMessage(botText);

    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, userMessage, botMessage],
    }));
  };


  const handleChooseRobot = () => {
    sendUserAndBotMessage(
      CHOOSE_ROBOT_MESSAGE,
      CHOOSE_ROBOT_MESSAGE_RESPONSE
    );

    enableChatInput();
  };

  const handleRobotIssue = () => {
    sendUserAndBotMessage(
      ROBOT_ISSUE_MESSAGE,
      ROBOT_ISSUE_MESSAGE_RESPONSE
    );
    enableChatInput();
  };

  const handleMaintenance = () => {
    sendUserAndBotMessage(
      ROBOT_MAINTENANCE_MESSAGE,
      ROBOT_MAINTENANCE_MESSAGE_RESPONSE
    );
    enableChatInput();
  };

  const handleMaintenanceServices = () => {
    sendUserAndBotMessage(ROBOBG_SERVICES_MESSAGE, CONTACT_MESSAGE_RESPONSE)
  };

  const handleContactTeam = () => {
    sendUserAndBotMessage(CONTACT_MESSAGE, CONTACT_MESSAGE_RESPONSE)
  };

  const getState = () => state;


  const addBotMessage = (text) => {
    const botMessage = createChatBotMessage(text);
    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, botMessage],
    }));
  };

  const hasStartedInteraction = () => interactionStarted;






  return (
    <div>
      {React.Children.map(children, (child) =>
        React.cloneElement(child, {
          actions: {
            handleChooseRobot,
            handleRobotIssue,
            handleMaintenance,
            handleContactTeam,
            handleMaintenanceServices,
            addBotMessage,
            getState,
            hasStartedInteraction,
            deleteMessages: (count = 1) => {
              setState((prev) => ({
                ...prev,
                messages: prev.messages.slice(0, -count),
              }));
            },
          },
        })
      )}
    </div>
  );
};


export default ActionProvider;
