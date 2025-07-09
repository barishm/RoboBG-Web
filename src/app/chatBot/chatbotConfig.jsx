import { createChatBotMessage } from 'react-chatbot-kit';
import InitialOptions from './InitialOptions';
import LinkWidget from './LinkWidget';


const config = {
  botName: 'РобоАсистент',
  initialMessages: [
    createChatBotMessage('Здравей! С какво мога да помогна?', {
      widget: 'initialOptions',
    }),
  ],
    customMessages: {
    linkMessage: (props) => <CustomLinkMessage {...props} />,
  },
  customStyles: {
    botMessageBox: { backgroundColor: '#376B7E' },
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
  ],
};

export default config;