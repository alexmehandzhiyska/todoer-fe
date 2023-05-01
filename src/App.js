import './App.css';
import { Routes, Route, BrowserRouter, Navigate } from 'react-router-dom';

import CreateList from './components/CreateList/CreateList';
import Home from './components/Home/Home';
import Layout from './components/Layout/Layout';

import { AreaProvider } from './contexts/areaContext';

function App() {
  return (
      <div className="App">
            <BrowserRouter>
            <AreaProvider>
                <Layout>
                    <Routes>
                        <Route path="/" element={<Navigate to="/tasks" />} />
                        <Route path="/tasks" element={<Home />} />
                        <Route path="/create" element={<CreateList />} />
                    </Routes>
                </Layout>
            </AreaProvider>
            </BrowserRouter>
        </div>
  );
}

export default App;
