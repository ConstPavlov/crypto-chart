import React from 'react';
import { Outlet } from 'react-router-dom';

function App() {
  React.useEffect(() => {});
  return (
    <div className="App">
      <Outlet />
    </div>
  );
}

export default App;
