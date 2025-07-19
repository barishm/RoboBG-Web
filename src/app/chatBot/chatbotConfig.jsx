import { createChatBotMessage,createCustomMessage } from 'react-chatbot-kit';
import InitialOptions from './InitialOptions';
import CustomBotMessage from './CustomBotMessage';


const config = {
  botName: 'РобоАсистент',
  initialMessages: [
    createChatBotMessage('Здравей! С какво мога да помогна?', {
      widget: 'initialOptions',
    }),
  ],
  customComponents: {
    botChatMessage: (props) => <CustomBotMessage {...props} />,
  },
  customStyles: {
    botMessageBox: { backgroundColor: '#ce1212ff' },
    chatButton: { backgroundColor: '#212529' },
  },
  widgets: [
    {
      widgetName: 'initialOptions',
      widgetFunc: (props) => <InitialOptions {...props} />,
    }
  ],
};

export default config;