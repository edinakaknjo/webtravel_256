import { BrowserRouter as Router, Route, Routes, Navigate} from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Users from './pages/users';
import Travels from './pages/travels';


function App() {
  return (
    
        <Router>
          <Routes>
          <Route path="/" element={<Navigate replace to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/users" element={<Users />}/>
          <Route path="/travels" element={<Travels />} />
          </Routes>
        </Router>
    
  );
}

export default App;
