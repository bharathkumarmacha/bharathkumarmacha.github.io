// src/components/NewChatButton.jsx
import React, { useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';

type NewChatButtonProps = {
  onNewChat: () => void;
};

const NewChatButton: React.FC<NewChatButtonProps> = ({ onNewChat }) => {
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onNewChat();
    }
  };

  return (
    <button
      ref={buttonRef}
      onClick={onNewChat}
      onKeyDown={handleKeyDown}
      className="flex items-center px-4 py-2 text-2xl rounded hover:bg-gray-200 transition duration-200"
      tabIndex={0}
      aria-label="Start new chat"
    >
      <FontAwesomeIcon icon={faEdit} />
    </button>
  );
};

export default NewChatButton;