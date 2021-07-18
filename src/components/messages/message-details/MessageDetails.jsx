import React, { useContext, useEffect, useState } from 'react';
import { useFetch } from 'use-http';
import { useParams } from 'react-router-dom';
import MessagesDetailsHeader from './message-details-header/MessageDetailsHeader';
import MessagesDetailsBody from './message-details-body/MessageDetailsBody';
import { Message } from '../../../context/Message-context';

const MessagesDetails = () => {
  const { get, patch, response } = useFetch();
  const [messageDetails, setMessageDetails] = useState(null);
  const { messageUnreadCountCxt, messageReadCxt } = useContext(Message);
  const [messagesUnreadCount, setMessagesUnreadCount] = messageUnreadCountCxt;
  const [, setMessageRead] = messageReadCxt;
  const { realtorId, messageId } = useParams();

  useEffect(() => {
    if (messageId) {
      getMessageDetails();
    }
  }, [messageId, realtorId]);

  useEffect(() => {
    setMessageDetails(null);
  }, [realtorId]);

  async function getMessageDetails() {
    const initialMessageDetails = await get(`/realtors/${realtorId}/messages/${messageId}`);
    if (response.ok) {
      setMessageDetails(initialMessageDetails);
      if (!initialMessageDetails.read) {
        setMessageRead(initialMessageDetails.id);
        setReadMessage();
      }
    }
  }

  async function setReadMessage() {
    await patch(`/realtors/${realtorId}/messages/${messageId}`, {
      read: true
    });
    if (response.ok) {
      setMessagesUnreadCount(messagesUnreadCount - 1);
    }
  }

  return (
    messageDetails && (
      <div data-testid={`message-details-${messageDetails.id}`} className={'message-details'}>
        <div className={'message-details__container'}>
          <div className={'message-details__inner-container'}>
            <MessagesDetailsHeader
              contact={messageDetails.contact}
              type={messageDetails.type}
            />
            <MessagesDetailsBody message={messageDetails} />
          </div>
        </div>
      </div>
    )
  );
};

export default MessagesDetails;
