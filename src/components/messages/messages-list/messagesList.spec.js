import React from 'react';
import { screen } from '@testing-library/react';
import MessagesList from './MessagesList';
import { customRender } from '../../../utils/testUtils';
import { mockAllIsIntersecting } from 'react-intersection-observer/test-utils';
import { mockMessages } from '../../../utils/mockMessages';

const providerProps = {
  messageReadCxt: [null, jest.fn()]
};

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'), // use actual for all non-hook parts
  useParams: () => ({
    realtorId: '101'
  }),
  useHistory: id => ({
    push: () => `/realtors/101/message/${id}`
  }),
  useRouteMatch: () => ({ url: '/realtors/101' })
}));
jest.mock('use-http', () => ({
  useFetch: () => {
    return {
      get: route => {
        const index = route.indexOf('?');
        const num = route.substring(index + '?page='.length)[0];

        if (num === '1') {
          return mockMessages.slice(0, 10);
        } else if (num === '2') {
          return mockMessages.slice(11, 20);
        } else {
          return [];
        }
      },
      response: {
        ok: true,
        headers: {
          get: () => '{"total_pages": 5}'
        }
      }
    };
  }
}));

test('show the list messages', async () => {
  customRender(<MessagesList />, providerProps);
  mockAllIsIntersecting(true);

  const message1 = await screen.findByText(content => content.includes('#10243'));
  const message2 = await screen.findByText(content => content.includes('#10229'));
  const message3 = await screen.findByText(content => content.includes('#10252'));
  const message4 = await screen.findByText(content => content.includes('#10234'));
  const message5 = await screen.findByText(content => content.includes('#10249'));
  const message6 = await screen.findByText(content => content.includes('#10201'));
  const message7 = await screen.findByText(content => content.includes('#10275'));
  const message8 = await screen.findByText(content => content.includes('#10271'));
  const message9 = await screen.findByText(content => content.includes('#10236'));
  const message10 = await screen.findByText(content => content.includes('#10228'));

  expect(message1).toBeInTheDocument();
  expect(message2).toBeInTheDocument();
  expect(message3).toBeInTheDocument();
  expect(message4).toBeInTheDocument();
  expect(message5).toBeInTheDocument();
  expect(message6).toBeInTheDocument();
  expect(message7).toBeInTheDocument();
  expect(message8).toBeInTheDocument();
  expect(message9).toBeInTheDocument();
  expect(message10).toBeInTheDocument();
});

test('user load next page', async () => {
  customRender(<MessagesList />, providerProps);
  mockAllIsIntersecting(true);

  const message = await screen.queryByText(content => content.includes('#10251'));

  expect(message).toBeFalsy();
  mockAllIsIntersecting(false);
  mockAllIsIntersecting(true);
  const messageRetry = await screen.findByText(content => content.includes('#10251'));
  expect(messageRetry).toBeInTheDocument();
});
