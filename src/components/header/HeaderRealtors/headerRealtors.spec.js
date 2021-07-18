import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import HeaderRealtors from './HeaderRealtors';
import { MessageProvider } from '../../../context/Message-context';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'), // use actual for all non-hook parts
  useParams: () => ({
    realtorId: '101'
  }),
  useHistory: () => ({
    push: jest.fn()
  }),
  useRouteMatch: () => ({ url: '/realtors/101' })
}));
jest.mock('use-http', () => ({
  useFetch: () => ({
    get: router => {
      if (router === '/realtors/') {
        return [
          {
            id: 101,
            name: 'Agence 1'
          },
          {
            id: 102,
            name: 'Agence 2'
          },
          {
            id: 103,
            name: 'Agence 3'
          }
        ];
      } else {
        return { unread_messages: 10 };
      }
    },
    response: { ok: true }
  })
}));

test('show header from a selected realtor', async () => {
  render(
    <MessageProvider>
      <HeaderRealtors />
    </MessageProvider>
  );
  const unreadCount = await screen.findByText('10');
  const realtor = await screen.findByText('Agence 1');

  expect(unreadCount).toBeInTheDocument();
  expect(realtor).toBeInTheDocument();
});

test('change realtor', async () => {
  render(
    <MessageProvider>
      <HeaderRealtors />
    </MessageProvider>
  );
  const realtor = await screen.findByText('Agence 1');

  expect(realtor).toBeInTheDocument();

  fireEvent.change(screen.getByTestId('select'), {
    target: { value: 103 }
  });

  expect(screen.getByText('Agence 3')).toBeInTheDocument();
});
