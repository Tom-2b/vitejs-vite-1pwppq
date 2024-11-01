import OpenAI from 'openai';
import { MODERATOR_PROMPT } from '../config/moderator-prompt';

interface Message {
  sender: string;
  text: string;
  timestamp: string;
}

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true
});

export async function getModeratorResponse(messages: Message[]): Promise<string> {
  const conversation = messages.map(msg => `${msg.sender}: ${msg.text}`).join('\n');
  
  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      { role: "system", content: MODERATOR_PROMPT },
      { role: "user", content: `Current conversation:\n${conversation}\n\nProvide a moderator response:` }
    ],
    temperature: 0.7,
    max_tokens: 150
  });

  return response.choices[0].message.content || "I apologize, but I couldn't generate a response.";
}