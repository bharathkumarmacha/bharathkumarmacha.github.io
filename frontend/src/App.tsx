import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/shared/Layout';
import { appRoutes } from './routes';
import { UserProvider } from './context/UserContext';
import './App.css';

export const App: React.FC = () => {
  return (
    <UserProvider>
      <Router>
        <Layout>
          <Routes>
            {appRoutes.map(({ path, element }) => (
              <Route key={path} path={path} element={element} />
            ))}
          </Routes>
        </Layout>
      </Router>
    </UserProvider>
  );
};

export default App;