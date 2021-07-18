import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import MessageTitle from './MessageTitle';

test('show email type', () => {
  render(
    <MessageTitle
      contact={{ firstname: 'toto', lastname: 'tata', phone: '00000000' }}
      type="email"
    />
  );

  expect(screen.getByText('toto tata'));
});

test('show not email type with names', () => {
  render(
    <MessageTitle
      contact={{ firstname: 'toto', lastname: 'tata', phone: '0000000000' }}
      type="phone"
    />
  );

  expect(screen.getByText('toto tata'));
  expect(screen.getByText('(00 00 00 00 00)'));
});

test('show not email type without names', () => {
  render(
    <MessageTitle
      contact={{ phone: '0000000000' }}
      type="phone"
    />
  );

  expect(screen.getByText('00 00 00 00 00'));
});
