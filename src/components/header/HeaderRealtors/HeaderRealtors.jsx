import React, { useContext, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useFetch } from 'use-http';
import { Message } from '../../../context/Message-context';

export const HeaderRealtors = () => {
  const [realtors, setRealtors] = useState([]);
  const [selectedRealtor, setSelectedRealtor] = useState(undefined);
  const { messageUnreadCountCxt } = useContext(Message);
  const [messagesUnreadCount, setMessagesUnreadCount] = messageUnreadCountCxt;
  const history = useHistory();
  const { realtorId } = useParams();
  const { get, response } = useFetch();

  useEffect(() => {
    initializeRealtors();
  }, []);

  useEffect(() => {
    if (realtorId) {
      setSelectedRealtor(realtorId);
      getUnreadMessages();
    }
  }, [realtorId]);

  async function initializeRealtors() {
    const initialRealtors = await get('/realtors/');

    if (response.ok) setRealtors(initialRealtors);
  }

  async function getUnreadMessages() {
    const { unread_messages: initialUnreadMessages } = await get(`/realtors/${realtorId}`);

    if (response.ok) setMessagesUnreadCount(initialUnreadMessages);
  }

  const handleChange = ({ target: { value } }) => {
    setSelectedRealtor(value);
    history.push(`/realtors/${value}`);
  };

  return (
    <div className={'header-realtors'}>
      <div className={'header-realtors__unread'}>
        <i className="mypro-icon mypro-icon-mail" />
        <span>{messagesUnreadCount}</span>
      </div>
      <div className={'header-realtors__select-realtor'}>
        <select
          data-testid="select"
          onChange={handleChange}
          defaultValue
          value={selectedRealtor}
        >
          <option disabled value>
            -- select --
          </option>
          {realtors.map(realtor => (
            <option key={realtor.id} value={realtor.id}>
              {realtor.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default HeaderRealtors;
