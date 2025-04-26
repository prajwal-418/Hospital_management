import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import DoctorsList from './pages/DoctorsList';
import BookAppointment from './pages/BookAppointment';
import PatientDashboard from './pages/PatientDashboard';
import DoctorDashboard from './pages/DoctorDashboard';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userData = localStorage.getItem('hospitalUser');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  return (
    <Router>
      <Navbar user={user} setUser={setUser} />
      <div className="container mx-auto px-4 py-8">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route path="/register" element={<Register setUser={setUser} />} />
          <Route path="/doctors" element={<DoctorsList />} />
          <Route path="/book-appointment/:doctorId" element={
            <ProtectedRoute user={user} role="patient">
              <BookAppointment user={user} />
            </ProtectedRoute>
          } />
          <Route path="/patient-dashboard" element={
            <ProtectedRoute user={user} role="patient">
              <PatientDashboard />
            </ProtectedRoute>
          } />
          <Route path="/doctor-dashboard" element={
            <ProtectedRoute user={user} role="doctor">
              <DoctorDashboard />
            </ProtectedRoute>
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;