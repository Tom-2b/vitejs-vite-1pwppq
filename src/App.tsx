import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage } from './components/ChatMessage';
import { ChatInput } from './components/ChatInput';
import { DecisionPanel } from './components/DecisionPanel';
import { getModeratorResponse } from './lib/openai';
import { Message, DecisionDimension } from './types';

const participants = ['AI1', 'AI2', 'User', 'Moderator'];

export default function App() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [selectedParticipant, setSelectedParticipant] = useState('User');
  const [problem, setProblem] = useState('');
  const [dimensions, setDimensions] = useState<DecisionDimension[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(false);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const parseTableCommand = (text: string): DecisionDimension[] => {
    const tableData = text.replace(/^set table:/i, '').trim();
    try {
      return JSON.parse(tableData);
    } catch (error) {
      console.error('Error parsing table data:', error);
      return [];
    }
  };

  const handleSendMessage = async (text: string) => {
    const newMessage: Message = {
      sender: selectedParticipant,
      text,
      timestamp: new Date().toLocaleTimeString(),
    };

    setMessages(prev => [...prev, newMessage]);

    if (selectedParticipant === 'Moderator') {
      if (text.toLowerCase().includes('set problem:')) {
        const newProblem = text.replace(/^set problem:/i, '').trim();
        setProblem(newProblem);
      } else if (text.toLowerCase().includes('set table:')) {
        const newDimensions = parseTableCommand(text);
        setDimensions(newDimensions);
      }
    } else {
      setIsLoading(true);
      try {
        const moderatorResponse = await getModeratorResponse([...messages, newMessage]);
        const moderatorMessage: Message = {
          sender: 'Moderator',
          text: moderatorResponse,
          timestamp: new Date().toLocaleTimeString(),
        };
        setMessages(prev => [...prev, moderatorMessage]);
      } catch (error) {
        console.error('Error getting moderator response:', error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <DecisionPanel problem={problem} dimensions={dimensions} />
      
      <div className="flex-1 flex flex-col">
        <header className="bg-white shadow-sm p-4 flex justify-between items-center">
          <h1 className="text-xl font-bold">twobrains.ai</h1>
          <select
            value={selectedParticipant}
            onChange={(e) => setSelectedParticipant(e.target.value)}
            className="border rounded-lg px-3 py-1"
          >
            {participants.map(p => (
              <option key={p} value={p}>{p}</option>
            ))}
          </select>
        </header>

        <div className="flex-1 overflow-y-auto p-4">
          <div className="max-w-3xl mx-auto bg-white rounded-lg shadow">
            {messages.map((message, index) => (
              <ChatMessage key={index} {...message} />
            ))}
            {isLoading && (
              <div className="p-4 text-center text-gray-500">
                Moderator is typing...
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>

        <div className="max-w-3xl mx-auto w-full">
          <ChatInput
            onSendMessage={handleSendMessage}
            selectedParticipant={selectedParticipant}
          />
        </div>
      </div>
    </div>
  );
}