import React from 'react';
import { render } from '@testing-library/react';
import { Message } from '../context/Message-context';

export const customRender = (ui, valueCxt) => {
  return render(<Message.Provider value={valueCxt}>{ui}</Message.Provider>);
};
