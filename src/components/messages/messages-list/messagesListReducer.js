export const initialMessagesListState = { realtorMessages: [], page: 1, pageMax: 1 };

export const messagesListReducer = (state, action, read = true) => {
  switch (action.type) {
    case 'change_page':
      return {
        ...state,
        page: state.page + 1,
        pageMax: action.pageMax,
        realtorMessages: [...state.realtorMessages, ...action.messages]
      };

    case 'reset_messages':
      return initialMessagesListState;

    case 'message_read': {
      const messages = [...state.realtorMessages];
      const foundIndex = state.realtorMessages.findIndex(
        message => message.id === action.messageId
      );
      if (foundIndex) {
        messages[foundIndex] = { ...messages[foundIndex], read: true };
      }
      return {
        ...state,
        realtorMessages: messages
      };
    }

    default:
      return state;
  }
};
