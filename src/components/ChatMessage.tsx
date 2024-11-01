import React from 'react';
import { FaRobot, FaUser, FaUserShield } from 'react-icons/fa';
import { LuBrain } from 'react-icons/lu';

interface ChatMessageProps {
  sender: string;
  text: string;
  timestamp: string;
}

const getIcon = (sender: string) => {
  switch (sender) {
    case 'AI1':
    case 'AI2':
      return <FaRobot className="text-blue-500" />;
    case 'User':
      return <FaUser className="text-green-500" />;
    case 'Moderator':
      return <FaUserShield className="text-purple-500" />;
    default:
      return <LuBrain className="text-gray-500" />;
  }
};

export function ChatMessage({ sender, text, timestamp }: ChatMessageProps) {
  return (
    <div className="p-4 border-b hover:bg-gray-50">
      <div className="flex items-center gap-2 mb-2">
        {getIcon(sender)}
        <span className="font-semibold">{sender}</span>
        <span className="text-xs text-gray-500">{timestamp}</span>
      </div>
      <p className="text-gray-700 ml-6">{text}</p>
    </div>
  );
}