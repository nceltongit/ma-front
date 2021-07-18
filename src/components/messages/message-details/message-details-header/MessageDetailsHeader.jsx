import React from 'react';
import PropTypes, { string } from 'prop-types';
import { getIconClassname, phoneFormat } from '../../../../utils/messageUtils';
import MessageTitle from '../../message-title/MessageTitle';

const MessagesDetailsHeader = ({ contact, type }) => {
  return (
    <div className={'message-details-header'}>
      <div className={'message-details-header__icon'}>
        <i className={getIconClassname(type)} />
      </div>
      <div className={'message-details-header__body'}>
        <MessageTitle contact={contact} type={type} />
        <div className={'message-details-header__infos'}>
          <div className={'message-details-header__label'}>Email</div>
          <div className={'message-details-header__value'}>{contact.email}</div>
        </div>
        <div className={'message-details-header__infos'}>
          <div className={'message-details-header__label'}>Téléphone</div>
          <div className={'message-details-header__value'}>{phoneFormat(contact.phone)}</div>
        </div>
      </div>
    </div>
  );
};

MessagesDetailsHeader.propTypes = {
  contact: PropTypes.object,
  type: string
};

MessagesDetailsHeader.defaultProps = {
  contact: {}
};

export default MessagesDetailsHeader;
