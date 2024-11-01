import React from 'react';
import { Participant } from '../types';
import { ParticipantIcon } from './ParticipantIcon';

interface ParticipantSelectorProps {
  selectedParticipant: Participant;
  onParticipantChange: (participant: Participant) => void;
}

export const ParticipantSelector: React.FC<ParticipantSelectorProps> = ({
  selectedParticipant,
  onParticipantChange,
}) => {
  const participants: Participant[] = ['AI1', 'AI2', 'User', 'Moderator'];

  return (
    <div className="flex items-center gap-2">
      <label htmlFor="participant" className="text-sm font-medium text-gray-700">
        Participating as:
      </label>
      <div className="flex items-center gap-2">
        <select
          id="participant"
          value={selectedParticipant}
          onChange={(e) => onParticipantChange(e.target.value as Participant)}
          className="w-32 px-3 py-2 border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {participants.map((participant) => (
            <option key={participant} value={participant}>
              {participant}
            </option>
          ))}
        </select>
        <ParticipantIcon participant={selectedParticipant} />
      </div>
    </div>
  );
};