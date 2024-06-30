import './App.css';
import { Outlet } from 'react-router-dom';
import AllUsers from './users';

function App() {
  return (
    <div>
      <Outlet />
      <AllUsers/>
    </div>
  );
}

export default App;
