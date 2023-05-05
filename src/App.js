import './App.css';
import { Routes, Route, BrowserRouter, Navigate } from 'react-router-dom';

import CreateList from './components/CreateList/CreateList';
import Tasks from './components/Tasks/Tasks';
import Layout from './components/Layout/Layout';

import { AreaProvider } from './contexts/areaContext';
import { CategoryProvider } from './contexts/categoryContext';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faStar, faInbox, faLayerGroup, faCalendar } from '@fortawesome/free-solid-svg-icons';

library.add(faStar, faInbox, faLayerGroup, faCalendar);

function App() {
  return (
      <div className="App">
            <BrowserRouter>
                <AreaProvider>
                    <CategoryProvider>
                        <Layout>
                            <Routes>
                                <Route path="/" element={<Navigate to="/tasks" />} />
                                <Route path="/create" element={<CreateList />} />
                                <Route path="/tasks" element={<Tasks />} />
                            </Routes>
                        </Layout>
                    </CategoryProvider>
                </AreaProvider>
            </BrowserRouter>
        </div>
  );
}

export default App;
