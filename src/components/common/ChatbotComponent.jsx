import { useState, useEffect } from 'react'
import Chatbot from 'react-chatbot-kit'
import 'react-chatbot-kit/build/main.css'
import config from 'src/app/chatBot/chatbotConfig'
import MessageParser from 'src/app/chatBot/MessageParser'
import ActionProvider from 'src/app/chatBot/ActionProvider'
import { disableChatInput } from 'src/app/chatBot/chatUtils'
import "src/styles/chatbot.css"

function ChatbotComponent() {
  const [showBot, toggleBot] = useState(false)

  useEffect(() => {
    if (showBot) {
      setTimeout(() => {
        disableChatInput()
      }, 1)
    }
  }, [showBot])

  return (
    <div className='chatBotSection'>
      {showBot && (
        <div className="chatbotWindow">
          <Chatbot
            config={config}
            headerText='Чат с РобоАсистент'
            placeholderText='Напишете съобщението си тук'
            messageParser={MessageParser}
            actionProvider={ActionProvider}
          />
        </div>
      )}
      <button className='chatBotToggleBtn' onClick={() => toggleBot((prev) => !prev)}>
        <img src="/images/chatBotAvatar.png" alt="Chatbot Avatar" />
      </button>
    </div>
  )
}

export default ChatbotComponent
