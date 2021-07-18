import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';

export const Message = createContext();

export const MessageProvider = ({ children }) => {
  const [messageRead, setMessageRead] = useState(null);
  const [messagesUnreadCount, setMessagesUnreadCount] = useState(0);

  return (
    <Message.Provider
      value={{
        messageReadCxt: [messageRead, setMessageRead],
        messageUnreadCountCxt: [messagesUnreadCount, setMessagesUnreadCount]
      }}
    >
      {children}
    </Message.Provider>
  );
};

MessageProvider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node])
};
