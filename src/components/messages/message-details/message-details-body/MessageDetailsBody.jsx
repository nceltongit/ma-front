import React from 'react';
import MessageTitle from '../../message-title/MessageTitle';
import PropTypes from 'prop-types';
import { formatExactDate } from '../../../../utils/dateUtils';

const MessagesDetailsBody = ({ message }) => {
  return (
    <div  className={'message-details-body'}>
      <div className={'message-details-body__container'}>
        <MessageTitle contact={message.contact} type={message.type} />
        <div className={'message-details-body__date'}>{formatExactDate(message.date)}</div>
        <div className={'message-details-body__text'}>{message.body}</div>
      </div>
    </div>
  );
};

MessagesDetailsBody.propTypes = {
  message: PropTypes.object
};

MessagesDetailsBody.defaultProps = {
  message: {}
};

export default MessagesDetailsBody;
