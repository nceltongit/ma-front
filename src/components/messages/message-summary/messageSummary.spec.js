import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import MessageSummary from './MessageSummary';

beforeAll(() => jest.spyOn(Date, 'now').mockImplementation(() => 1616842800000));

test('show message disabled', () => {
  const { container } = render(
    <MessageSummary
      onClick={() => {}}
      message={{ read: true, date: new Date('2021-03-02'), contact: { phone: '0000000000' } }}
    />
  );

  expect(container.firstChild).toHaveClass('message-summary--disabled');
});

test('show time now', () => {
  render(
    <MessageSummary
      onClick={() => {}}
      message={{
        read: true,
        date: new Date(1616842755000),
        type: 'email',
        contact: { phone: '0000000000' }
      }}
    />
  );

  expect(screen.getByText('Maintenant'));
});

test('show time x miutes ago', () => {
  render(
    <MessageSummary
      onClick={() => {}}
      message={{
        read: true,
        date: new Date(1616842620000),
        type: 'email',
        contact: { phone: '0000000000' }
      }}
    />
  );

  expect(screen.getByText('Il y a 3 minutes'));
});

test('show time x hours ago', () => {
  render(
    <MessageSummary
      onClick={() => {}}
      message={{
        read: true,
        date: new Date(1616835600000),
        type: 'email',
        contact: { phone: '0000000000' }
      }}
    />
  );

  expect(screen.getByText('Il y a 2 heures'));
});

test('show hours of message', () => {
  render(
    <MessageSummary
      onClick={() => {}}
      message={{
        read: true,
        date: new Date(1616763600000),
        type: 'email',
        contact: { phone: '0000000000' }
      }}
    />
  );

  expect(screen.getByText('14:03'));
});

test('show day of message', () => {
  render(
    <MessageSummary
      onClick={() => {}}
      message={{
        read: true,
        date: new Date(1616590800000),
        type: 'email',
        contact: { phone: '0000000000' }
      }}
    />
  );

  expect(screen.getByText('mercredi'));
});

test('show date of message', () => {
  render(
    <MessageSummary
      onClick={() => {}}
      message={{
        read: true,
        date: new Date(1614171600000),
        type: 'email',
        contact: { phone: '0000000000' }
      }}
    />
  );

  expect(screen.getByText('24/2/21'));
});

test('show type email message', () => {
  render(
    <MessageSummary
      onClick={() => {}}
      message={{
        read: true,
        date: new Date(1614171600000),
        type: 'email',
        contact: { phone: '0000000000' },
        body: 'Test body',
        subject: 'Test subject'
      }}
    />
  );

  expect(screen.getByText('Message sur votre vitrine Meilleurs Agents'));
  expect(screen.getByText('Test body'));
  expect(screen.getByTestId('icon-class')).toHaveClass('mypro-icon-mail');
});

test('show type sms message', () => {
  render(
    <MessageSummary
      onClick={() => {}}
      message={{
        read: true,
        date: new Date(1614171600000),
        type: 'sms',
        contact: { phone: '0000000000' },
        body: 'Test body',
        subject: 'Test subject'
      }}
    />
  );

  expect(screen.getByText('SMS sur votre vitrine Meilleurs Agents'));
  expect(screen.getByText('Test body'));
  expect(screen.getByTestId('icon-class')).toHaveClass('mypro-icon-sms');
});

test('show type phone message', () => {
  render(
    <MessageSummary
      onClick={() => {}}
      message={{
        read: true,
        date: new Date(1614171600000),
        type: 'phone',
        contact: { phone: '0000000000' },
        body: 'Test body',
        subject: 'Test subject'
      }}
    />
  );

  expect(screen.getByText('Message vocal sur votre vitrine Meilleurs Agents'));
  expect(screen.getByText('Test subject'));
  expect(screen.getByTestId('icon-class')).toHaveClass('mypro-icon-phone');
});
