// config.js
import { createChatBotMessage } from 'react-chatbot-kit';
import InitialOptions from './InitialOptions'; // Make sure this import is correct

const botName = 'РобоАсистент';

const config = {
  botName: botName,
  initialMessages: [
    createChatBotMessage('Здравей! С какво мога да помогна?', {
      widget: 'initialOptions',
    }),
  ],
  customStyles: {
    botMessageBox: {
      backgroundColor: '#376B7E',
    },
    chatButton: {
      backgroundColor: '#212529',
    },
  },
  widgets: [
    {
      widgetName: 'initialOptions',
      widgetFunc: (props) => <InitialOptions {...props} />,
    },
  ],
};

export default config;
