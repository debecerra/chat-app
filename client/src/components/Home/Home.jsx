/**
 * Contains the Home component which acts as the main landing page for the web app.
 */

import React from 'react';
import { Redirect } from 'react-router-dom';

/**
 * Home page for the app. Currently redirects to the /dashboard route.
 */
const Home = () => (
  <Redirect to={{ pathname: '/dashboard' }} />
);

export default Home;
