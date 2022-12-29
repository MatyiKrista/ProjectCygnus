import { Routes, Route } from 'react-router-dom';
import Home from './scenes/Home';
import Login from './scenes/Login';
import RequireAuth from './components/auth/RequireAuth';
import GameCanvas from './scenes/GameCanvas';
import ToastProvider from './components/ui/toast/ToastProvider';
import { GlobalStyle } from './components/ui/GlobalStyle';

const App = () => {
  return (
    <>
      <GlobalStyle />
      <ToastProvider>
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
                <GameCanvas />
              </RequireAuth>
            }
          />
        </Routes>
      </ToastProvider>
    </>
  );
};

export default App;
