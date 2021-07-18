import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { formatDateTimeAgo } from '../../../utils/dateUtils';
import { formatTypeText, getIconClassname, isPhoneType } from '../../../utils/messageUtils';
import MessageTitle from '../message-title/MessageTitle';

const MessageSummary = ({ message, onClick }) => {
  const messageSummaryClassnames = classnames('message-summary', {
    'message-summary--disabled': message.read
  });

  return (
    <div
      data-testid={`class-summary-${message.id}`}
      className={messageSummaryClassnames}
      onClick={() => onClick(message.id)}
    >
      <div className={'message-summary__container'}>
        <div className={'message-summary__icon'}>
          <i data-testid="icon-class" className={getIconClassname(message.type)} />
        </div>
        <div className={'message-summary__body'}>
          <div className={'message-summary__title'}>
            <MessageTitle contact={message.contact} type={message.type} />
            <div className={'message-summary__hour'}>{formatDateTimeAgo(message.date)}</div>
          </div>
          <div className={'message-summary__type-text'}>{formatTypeText(message.type)}</div>
          <div className={'message-summary__body-text'}>
            {isPhoneType(message.type) ? message.subject : message.body}
          </div>
        </div>
      </div>
    </div>
  );
};

MessageSummary.propTypes = {
  message: PropTypes.object,
  onClick: PropTypes.func
};

MessageSummary.defaultProps = {
  message: {},
  onClick: () => {}
};

export default MessageSummary;
