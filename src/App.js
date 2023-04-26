import './App.css';
import { Routes, Route, BrowserRouter, Navigate } from 'react-router-dom';

import Home from './components/Home/Home';
import Layout from './components/Layout/Layout';

function App() {
    console.log('in app');
  return (
    <div className="App">
        <BrowserRouter>
            <Layout>
                <Routes>
                    <Route path="/" element={<Navigate to="/tasks" />} />
                    <Route path="/tasks" element={<Home />} />
                </Routes>
            </Layout>
        </BrowserRouter>
    </div>
  );
}

export default App;
