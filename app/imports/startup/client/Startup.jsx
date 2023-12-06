import React from 'react';
import ReactDOM from 'react-dom/client';
import { Meteor } from 'meteor/meteor';
import App from '../../ui/layouts/App.jsx';

// Startup the application by rendering the App layout component.
Meteor.startup(() => {
  // process.env.MAIL_URL = 'smtp://manoamunchies3@gmail.com:ICS314!@:25/';
  const root = ReactDOM.createRoot(
    document.getElementById('root'),
  );
  root.render(<App />);
});
