'use client';
import { useState, useEffect, useRef } from 'react';
import Image from "next/image";

type Message = {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
};

const QUICK_REPLIES = [
  "What services do you offer?",
  "How do I book an appointment?",
  "What are your prices?",
  "Tell me about your team"
];

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isUserTyping, setIsUserTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const savedMessages = localStorage.getItem('chatbot-messages');
    if (savedMessages) {
      try {
        const parsedMessages = JSON.parse(savedMessages);
        
        const messagesWithDates = parsedMessages.map((msg: any) => ({
          ...msg,
          timestamp: new Date(msg.timestamp)
        }));
        setMessages(messagesWithDates);
      } catch (error) {
        console.error('Failed to parse saved messages:', error);
      }
    }
    
    audioRef.current = new Audio('/chat-notification.mp3'); 
  }, []);

  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem('chatbot-messages', JSON.stringify(messages));
    }
  }, [messages]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsUserTyping(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [inputText]);

  const playSound = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(error => console.log('Audio play failed:', error));
    }
  };

  const getBotResponse = (userMessage: string): string => {
    const lowerCaseMessage = userMessage.toLowerCase();

    if (lowerCaseMessage.includes('service') || lowerCaseMessage.includes('offer')) {
      return "We offer physiotherapy services for conditions like arthritis, paralysis, stroke rehabilitation, joint pain, and post-operative care. You can explore our services page for more details.";
    } else if (lowerCaseMessage.includes('book') || lowerCaseMessage.includes('appointment')) {
      return "You can book an appointment through our booking page. We&apos;ll need some basic information and your preferred date/time.";
    } else if (lowerCaseMessage.includes('price') || lowerCaseMessage.includes('cost')) {
      return "Our pricing varies based on the type of treatment and session duration. Please check our pricing page for detailed information.";
    } else if (lowerCaseMessage.includes('team') || lowerCaseMessage.includes('doctor')) {
      return "Our team consists of experienced physiotherapists specializing in different areas. Meet our experts on the team page.";
    } else if (lowerCaseMessage.includes('hello') || lowerCaseMessage.includes('hi')) {
      return "Hello! How can I help you today?";
    } else {
      return "I&apos;m here to assist with information about our physiotherapy services. You can ask about our services, booking, pricing, or team.";
    }
  };

  const handleSendMessage = () => {
    if (inputText.trim() === '') return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsUserTyping(false);
    playSound();

    setIsTyping(true);

    setTimeout(() => {
      const botResponse = getBotResponse(inputText);
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: botResponse,
        sender: 'bot',
        timestamp: new Date()
      };

      setIsTyping(false);
      setMessages(prev => [...prev, botMessage]);
      playSound();
    }, 1500); 
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value);
    setIsUserTyping(e.target.value.length > 0);
  };

  const handleQuickReply = (reply: string) => {
    setInputText(reply);
    setIsUserTyping(true);
    setTimeout(() => handleSendMessage(), 100);
  };

  const clearChat = () => {
    setMessages([]);
    localStorage.removeItem('chatbot-messages');
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
    
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-green-800 text-white p-4 rounded-full shadow-lg hover:bg-green-700 transition-all duration-300 animate-bounce"
          aria-label="Open chat"
        >
          <div className="w-8 h-8 relative">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <path d="M4.798 3a3.75 3.75 0 00-3.75 3.75v7.5a3.75 3.75 0 003.75 3.75h2.25v3a.75.75 0 001.28.53l3.75-3.75h5.471a3.75 3.75 0 003.75-3.75v-7.5A3.75 3.75 0 0019.202 3H4.798z" />
            </svg>
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
            </span>
          </div>
        </button>
      )}

      {isOpen && (
        <div className="bg-white rounded-lg shadow-xl w-80 h-96 flex flex-col border border-green-200 animate-fade-in-up">
          
          <div className="bg-green-800 text-white p-3 rounded-t-lg flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Image 
                src="https://cdn-icons-png.flaticon.com/512/4711/4711986.png" 
                alt="Chatbot Avatar" 
                className="rounded-full"
                width={32}
                height={32}
              />
              <div>
                <h3 className="font-semibold">Physio Assistant</h3>
                <p className="text-xs text-green-200">Online</p>
              </div>
            </div>
            <div className="flex space-x-2">
              <button 
                onClick={clearChat}
                className="text-green-200 hover:text-white transition-colors"
                title="Clear chat history"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </button>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-green-200 hover:text-white transition-colors"
                aria-label="Close chat"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </div>
          <div className="flex-1 p-3 overflow-y-auto bg-green-50">
            {messages.length === 0 ? (
              <div className="text-center text-gray-500 my-8">
                <p>Hello! I&apos;m here to help with your physiotherapy questions.</p>
              </div>
            ) : (
              messages.map((message) => (
                <div
                  key={message.id}
                  className={`mb-3 flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-xs p-3 rounded-lg ${
                      message.sender === 'user'
                        ? 'bg-green-700 text-white rounded-br-none'
                        : 'bg-white text-gray-800 border border-green-200 rounded-bl-none'
                    }`}
                  >
                    <p className="text-sm">{message.text}</p>
                    <p className={`text-xs mt-1 ${message.sender === 'user' ? 'text-green-200' : 'text-gray-500'}`}>
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>
              ))
            )}
            
            {isTyping && (
              <div className="flex justify-start mb-3">
                <div className="bg-white text-gray-800 p-3 rounded-lg rounded-bl-none border border-green-200">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-green-600 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-green-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    <div className="w-2 h-2 bg-green-600 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {messages.length === 0 && (
            <div className="px-3 py-2 bg-green-100 border-t border-green-200">
              <p className="text-xs text-gray-600 mb-1">Quick questions:</p>
              <div className="flex flex-wrap gap-2">
                {QUICK_REPLIES.map((reply, index) => (
                  <button
                    key={index}
                    onClick={() => handleQuickReply(reply)}
                    className="bg-white text-green-800 text-xs px-2 py-1 rounded-full border border-green-300 hover:bg-green-700 hover:text-white transition-colors"
                  >
                    {reply}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="p-3 border-t border-green-200 bg-white rounded-b-lg">
            <div className="flex space-x-2">
              <input
                type="text"
                value={inputText}
                onChange={handleInputChange}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Type your message..."
                className={`flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 transition-colors text-gray-800 ${
                  isUserTyping 
                    ? 'border-green-500 focus:ring-green-500 bg-green-50' 
                    : 'border-green-300 focus:ring-green-500'
                }`}
              />
              <button
                onClick={handleSendMessage}
                disabled={inputText.trim() === ''}
                className="bg-green-700 text-white p-2 rounded-lg hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
