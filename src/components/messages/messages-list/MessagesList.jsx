import React, { useCallback, useContext, useEffect, useReducer } from 'react';
import MessageSummary from '../message-summary/MessageSummary';
import { useFetch } from 'use-http';
import { useHistory, useParams } from 'react-router-dom';
import Loader from '../../../app/loader/Loader';
import { useInView } from 'react-intersection-observer';
import { initialMessagesListState, messagesListReducer } from './messagesListReducer';
import { Message } from '../../../context/Message-context';

const MessagesList = () => {
  const { get, response, loading } = useFetch();
  const { realtorId } = useParams();
  const history = useHistory();
  const { messageReadCxt } = useContext(Message);
  const [messageRead] = messageReadCxt;
  const [state, dispatch] = useReducer(messagesListReducer, initialMessagesListState);
  const { ref, inView } = useInView({
    threshold: 1
  });

  useEffect(() => {
    if (inView && !loading && state.page <= state.pageMax) {
      getRealtorMessages();
    }
  }, [inView]);

  useEffect(() => {
    dispatch({ type: 'reset_messages' });
  }, [realtorId]);

  useEffect(() => {
    if (messageRead) {
      dispatch({
        type: 'message_read',
        messageId: messageRead
      });
    }
  }, [messageRead]);

  async function getRealtorMessages() {
    const realtorMessages = await get(
      `/realtors/${realtorId}/messages/?page=${state.page}&sort=date:desc`
    );
    if (response.ok) {
      dispatch({
        type: 'change_page',
        pageMax: JSON.parse(response.headers.get('x-pagination')).total_pages,
        messages: realtorMessages
      });
    }
  }

  const handleClick = useCallback(
    id => {
      history.push(`/realtors/${realtorId}/message/${id}`);
    },
    [realtorId]
  );

  return (
    <div className={'messages-list'}>
      {state.realtorMessages.map(message => (
        <MessageSummary key={message.id} message={message} onClick={handleClick} />
      ))}
      <div ref={ref}>{loading && <Loader />}</div>
    </div>
  );
};

export default MessagesList;
