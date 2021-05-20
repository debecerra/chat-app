import React from 'react';

import ChatList from '../ChatList/ChatList';
import ChatEditor from '../ChatEditor/ChatEditor';

// eslint-disable-next-line arrow-body-style
const Dashboard = () => {
  return (
    <>
      <ChatList />
      <ChatEditor />
    </>
  );
};

export default Dashboard;
