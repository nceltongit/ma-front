import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Messages from './messages/Messages';
import Header from './header/Header';
import { useMediaQuery } from 'react-responsive/src';
import MessagesList from './messages/messages-list/MessagesList';
import MessageDetails from './messages/message-details/MessageDetails';
import { MessageProvider } from '../context/Message-context';

const Router = () => {
  const isTabletOrMobile = useMediaQuery({ maxWidth: 970 });
  const isTabletOrMobileDevice = useMediaQuery({ maxDeviceWidth: 970 });

  return (
    <Switch>
      <MessageProvider>
        <Route exact path="/">
          <Header />
        </Route>
        {isTabletOrMobile || isTabletOrMobileDevice ? (
          <>
            <Route exact path="/realtors/:realtorId">
              <Header />
              <MessagesList />
            </Route>
            <Route exact path="/realtors/:realtorId/message/:messageId">
              <Header />
              <MessageDetails />
            </Route>
          </>
        ) : (
          <Route
            exact
            path={['/realtors/:realtorId', '/realtors/:realtorId/message/:messageId']}
          >
            <Header />
            <Messages />
          </Route>
        )}
      </MessageProvider>
    </Switch>
  );
};

export default Router;
