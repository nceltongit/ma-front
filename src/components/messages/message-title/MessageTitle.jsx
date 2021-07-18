import React from 'react';
import PropTypes from 'prop-types';
import { isEmailType, phoneFormat } from '../../../utils/messageUtils';

const MessageTitle = ({ contact, type }) => {
  return (
    <span className={'message-title'}>
      {isEmailType(type) ? (
        <span>{`${contact.firstname} ${contact.lastname}`}</span>
      ) : contact.firstname ? (
        <>
          <span>
            {contact.firstname} {contact.lastname}
          </span>
          <span className={'message-title--small'}>({phoneFormat(contact.phone)})</span>
        </>
      ) : (
        <span>{phoneFormat(contact.phone)}</span>
      )}
    </span>
  );
};

MessageTitle.propTypes = {
  contact: PropTypes.object,
  type: PropTypes.string
};

MessageTitle.defaultProps = {
  contact: {}
};

export default MessageTitle;
