import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import GlobalStyles from './components/GlobalStyles';
import { Provider } from 'react-redux';
import {store, persistor } from './redux/store';
import reportWebVitals from './reportWebVitals';
import { PersistGate } from 'redux-persist/integration/react';
import { GoogleOAuthProvider } from '@react-oauth/google';



const root = ReactDOM.createRoot(document.getElementById('root'));
const googleClientId = '332878079801-fe5u0f1o3m5ecmng98okod6kbkcdg3c7.apps.googleusercontent.com';

root.render(
    <React.StrictMode>
      <GoogleOAuthProvider clientId={googleClientId}>
        <GlobalStyles>
          <Provider store={store}>
              <PersistGate loading={null} persistor={persistor}>
                  <App />
              </PersistGate>
          </Provider>
        </GlobalStyles>
      </GoogleOAuthProvider>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
