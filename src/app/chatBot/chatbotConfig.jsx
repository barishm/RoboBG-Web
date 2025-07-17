import { createChatBotMessage,createCustomMessage } from 'react-chatbot-kit';
import InitialOptions from './InitialOptions';
import LinkWidget from './LinkWidget';
import CustomBotMessage from './CustomBotMessage';


const config = {
  botName: 'РобоАсистент',
  initialMessages: [
    createChatBotMessage('Здравей! С какво мога да помогна?', {
      widget: 'initialOptions',
    }),
    createCustomMessage('Test', 'custom')
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
    },
        {
      widgetName: "linkWidget",
      widgetFunc: (props) => <LinkWidget {...props} />,
    },
      {
    widgetName: 'linkMessage',
    widgetFunc: (props) => <CustomLinkMessage {...props} />,
  },
  ],
};

export default config;