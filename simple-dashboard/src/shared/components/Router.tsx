import { BrowserRouter, Route, Routes } from 'react-router-dom';
import App from '../../App';

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={ <App /> } />
        {/* <Route path='*' element = { <Navigate to='/'/> } /> */}
      </Routes>
    </BrowserRouter>
  );
}
