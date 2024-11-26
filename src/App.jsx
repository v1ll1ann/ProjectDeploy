import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import LoginRegister from './components/LoginRegister/LoginRegister';
import DemographicForm from './components/Demographic/Demographic';
import Home from './components/Home/Home';
import PropertyDetail from './components/PropertyDetail/PropertyDetail';
import './index.css';
import History from './components/History/History';
import SearchResult from './components/SearchResult/SearchResult';
import ShowAllResult from './components/ShowAll/ShowAllResult/ShowAllResult';
import Admin from './components/Admin/Admin';
import Adminhome from './components/Manage/Manage';

function App() {
  const [user, setUser] = useState(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    return storedUser || null;
  });

  const handleSetUser = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <Router>
      <div className='App'>
        <Navbar user={user} handleLogout={handleLogout} />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginRegister setUser={handleSetUser} />} />
          <Route path="/demographic" element={<DemographicForm />} />
          <Route path='/property/:id' element={<PropertyDetail user={user} />} />
          <Route path='/history' element={<History />} />
          <Route path='/result' element={<SearchResult />} />
          <Route path='/showallresult' element={<ShowAllResult />} />
          <Route path='/admin' element={<Admin setUser={handleSetUser} />} />
          <Route path='/adminhome' element={<Adminhome />} />
          <Route path="*" element={<div>404 Not Found</div>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
