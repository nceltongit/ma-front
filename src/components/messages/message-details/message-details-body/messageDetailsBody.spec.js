import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import MessagesDetailsBody from './MessageDetailsBody';

test('show date of message', () => {
  render(
    <MessagesDetailsBody
      message={{ read: true, date: new Date(1626618853000), contact: { phone: '0000000000' } }}
    />
  );

  expect(screen.getByText('18 juillet 2021 à 16:07'));
});
