import React, { useState, useEffect } from 'react';
import Amplify, { Auth, I18n } from 'aws-amplify';
import Layout from 'components/Layout';
import Header from 'components/Header';
import SpinnerPage from 'components/SpinnerPage';
import {
  ConfirmSignIn, ConfirmSignUp, ForgotPassword,
  RequireNewPassword, SignUp, VerifyContact,
  withAuthenticator,
} from 'aws-amplify-react';
import ConnectedAlert from 'containers/Alert/ConnectedAlert';
import ConnectedToast from 'containers/Toast/ToastConnected';
import { SET_USER_INFO } from 'constants/actionTypes';
import { useDispatch } from 'react-redux';
import SideContainer from './SideContainer';
import awsconfig from '../aws-exports';
import Page from './Page';
import './App.scss';

import 'assets/css/custom-bootstrap.css';
import CustomSignIn from './CustomSignIn';

I18n.setLanguage('es');
Amplify.configure(awsconfig);

const mql = window.matchMedia('(min-width: 800px)');

function App() {
  const [status, setStatus] = useState({ sidebarDocked: mql.matches, sidebarOpen: false });
  const [user, setUser] = useState({ name: '', role: '' });
  const dispatch = useDispatch();
  useEffect(() => {
    Auth.currentAuthenticatedUser()
      .then((data) => {
        const role = data.signInUserSession.accessToken.payload['cognito:groups'] !== undefined ? data.signInUserSession.accessToken.payload['cognito:groups'][0] : '';
        setUser({ name: data.username.toUpperCase(), role, email: data.attributes.email });
        dispatch({ type: SET_USER_INFO, user: data });
      })
      .catch((err) => console.log(err));
  }, [dispatch]);

  const mediaQueryChanged = () => {
    setStatus({ sidebarDocked: mql.matches, sidebarOpen: false });
  };

  useEffect(() => {
    mql.addListener(mediaQueryChanged);
    return () => mql.removeListener(mediaQueryChanged);
  }, []);

  return (
    <div className="App">
      {user.role === ''
        ? <SpinnerPage />
        : (
          <Layout
            sidebar={(
              <SideContainer
                isOpen={status.sidebarOpen}
                isDocked={status.sidebarDocked}
                onClose={() => setStatus({ ...status, sidebarOpen: false })}
              />
            )}
            open={status.sidebarOpen}
            docked={status.sidebarDocked}
            onSetOpen={(open) => setStatus({ ...status, sidebarOpen: open })}
          >
            <main className="App-main">
              <Header
                isOpen={status.sidebarOpen}
                isDocked={status.sidebarDocked}
                handleOpenSidebar={() => setStatus({ ...status, sidebarOpen: !status.open })}
                user={user}
              />
              <Page role={user.role} trigger={mediaQueryChanged} />
            </main>
            <ConnectedAlert />
            <ConnectedToast />
          </Layout>
        )}
    </div>
  );
}

export default withAuthenticator(App, false, [
  <CustomSignIn />,
  <ConfirmSignIn />,
  <VerifyContact />,
  <SignUp />,
  <ConfirmSignUp />,
  <ForgotPassword />,
  <RequireNewPassword />,
]);
