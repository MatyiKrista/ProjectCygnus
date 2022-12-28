import { Routes, Route } from 'react-router-dom';
import Home from './scenes/Home';
import Login from './scenes/Login';
import RequireAuth from './auth/RequireAuth';

const App = () => {
  return (
    <Routes>
      <Route path='/login' element={<Login />} />
      <Route
        path='/'
        element={
          <RequireAuth>
            <Home />
          </RequireAuth>
        }
      />
      <Route
        path='/:id'
        element={
          <RequireAuth>
            <Home />
          </RequireAuth>
        }
      />
    </Routes>
  );
};

export default App;
