import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { mockAllIsIntersecting } from 'react-intersection-observer/test-utils';
import { mockMessages } from '../utils/mockMessages';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import App from './App';

jest.mock('use-http', () => ({
  useFetch: () => {
    return {
      get: route => {
        if (route === '/realtors/101/messages/?page=1&sort=date:desc') {
          return mockMessages;
        } else if (route === '/realtors/101/messages/10275') {
          return mockMessages.find(message => message.id === 10275);
        } else if (route === '/realtors/') {
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
        } else if (route === '/realtors/101') {
          return { unread_messages: 60 };
        } else {
          return [];
        }
      },
      patch: () => jest.fn(),
      response: {
        ok: true,
        headers: {
          get: () => '{"total_pages": 5}'
        }
      }
    };
  }
}));
jest.mock('react-responsive/src', () => ({
  useMediaQuery: () => {
    return '';
  }
}));

test('show the count unread message after read', async () => {
  const history = createMemoryHistory();
  history.push('/realtors/101');
  render(
    <Router history={history}>
      <App />
    </Router>
  );

  mockAllIsIntersecting(true);
  const message1 = await screen.findByTestId('class-summary-10275');
  const numbeBefore = await screen.findByText('60');

  expect(numbeBefore).toBeInTheDocument();

  fireEvent.click(message1);

  const numberActu = await screen.findByText('59');

  expect(numberActu).toBeInTheDocument();
});

test('show the details message after clicking', async () => {
  const history = createMemoryHistory();
  history.push('/realtors/101');
  render(
    <Router history={history}>
      <App />
    </Router>
  );

  mockAllIsIntersecting(true);
  const messageSummary = await screen.findByTestId('class-summary-10275');

  fireEvent.click(messageSummary);

  const messageDetails = await screen.findByTestId('message-details-10275');

  expect(messageDetails).toBeInTheDocument();
});

test('show the details message from url', async () => {
  const history = createMemoryHistory();
  history.push('/realtors/101/message/10275');
  render(
    <Router history={history}>
      <App />
    </Router>
  );

  mockAllIsIntersecting(true);

  const messageDetails = await screen.findByTestId('message-details-10275');

  expect(messageDetails).toBeInTheDocument();
});

test('show the message read after click on it', async () => {
  const history = createMemoryHistory();
  history.push('/realtors/101');
  render(
    <Router history={history}>
      <App />
    </Router>
  );

  mockAllIsIntersecting(true);

  const messageSummary = await screen.findByTestId('class-summary-10275');
  expect(messageSummary).not.toHaveClass('message-summary--disabled');

  fireEvent.click(messageSummary);

  const messageSummaryUpdate = await screen.findByTestId('class-summary-10275');

  expect(messageSummaryUpdate).toHaveClass('message-summary--disabled');
});

test('show the message read from url', async () => {
  const history = createMemoryHistory();
  history.push('/realtors/101/message/10275');
  render(
    <Router history={history}>
      <App />
    </Router>
  );

  mockAllIsIntersecting(true);

  const messageSummary = await screen.findByTestId('class-summary-10275');
  expect(messageSummary).toHaveClass('message-summary--disabled');
});
