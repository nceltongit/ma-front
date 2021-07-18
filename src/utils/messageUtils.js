import { MESSAGE_TYPE } from './constants';
import classnames from 'classnames';

export const formatTypeText = type => {
  let text = '';
  switch (type) {
    case MESSAGE_TYPE.SMS:
      text = text.concat('', 'SMS');
      break;

    case MESSAGE_TYPE.PHONE:
      text = text.concat('', 'Message vocal');
      break;

    case MESSAGE_TYPE.EMAIL:
      text = text.concat('', 'Message');
      break;

    default:
      break;
  }

  text = text.concat(' ', 'sur votre vitrine Meilleurs Agents');

  return text;
};

export const isPhoneType = type => type === MESSAGE_TYPE.PHONE;
export const isSmsType = type => type === MESSAGE_TYPE.SMS;
export const isEmailType = type => type === MESSAGE_TYPE.EMAIL;

export const getIconClassname = type =>
  classnames(
    'mypro-icon',
    {
      'mypro-icon-phone': isPhoneType(type)
    },
    {
      'mypro-icon-sms': isSmsType(type)
    },
    {
      'mypro-icon-mail': isEmailType(type)
    }
  );

export const phoneFormat = phone => phone.match(/.{1,2}/g).join(' ');
