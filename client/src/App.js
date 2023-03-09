import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Login from './Pages/Login';
import Signup from './Pages/Signup.jsx';
import Home from './Pages/Home.js';
import ErrorPage from './Pages/ErrorPage.js';

function App() {   
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/creatuser" element={<Signup />} />
      <Route path="/home" element={<Home />} />
      <Route path="*" element={<ErrorPage />} />
      </Routes>
    </Router>
  );
}

export default App;  
