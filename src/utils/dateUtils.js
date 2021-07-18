import { differenceInMinutes, format } from 'date-fns';

const frenchLocale = require('date-fns/locale/fr/index.js');

export const formatDateTimeAgo = date => {
  const diffMinutes = differenceInMinutes(new Date(Date.now()), new Date(date));

  if (diffMinutes < 1) {
    return 'Maintenant';
  } else if (diffMinutes < 60) {
    return `Il y a ${diffMinutes} minutes`;
  }

  const diffHours = Math.round(diffMinutes / 60);
  if (diffHours < 4) {
    return `Il y a ${diffHours} heures`;
  }
  const diffDays = Math.floor(diffMinutes / 1440);
  if (diffDays < 1) {
    return format(new Date(date), 'HH:MM');
  } else if (diffDays < 7) {
    return format(new Date(date), 'EEEE', {
      locale: frenchLocale
    });
  }

  return format(new Date(date), 'd/M/yy');
};

export const formatExactDate = date =>
  `${format(new Date(date), 'd MMMM yyyy', {
    locale: frenchLocale
  })} à ${format(new Date(date), 'HH:MM', {
    locale: frenchLocale
  })}`;
