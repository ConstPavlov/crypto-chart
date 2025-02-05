import React from 'react';
import { Outlet } from 'react-router-dom';
import PageLayout from './layouts/BaseLayout';

function App() {
  React.useEffect(() => {});
  return (
    <div className="App">
      <PageLayout />
      <Outlet />
    </div>
  );
}

export default App;
