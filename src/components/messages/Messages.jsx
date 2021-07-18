import React from 'react';
import MessagesList from './messages-list/MessagesList';
import MessageDetails from './message-details/MessageDetails';

const Messages = () => {
  return (
    <div className={'messages'}>
      <MessagesList />
      <MessageDetails />
    </div>
  );
};

export default Messages;
