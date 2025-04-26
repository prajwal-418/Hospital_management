import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { register } from '../utils/api';

const Register = ({ setUser }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    role: 'patient',
    specialty: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (formData.password !== formData.confirmPassword) {
      return setError('Passwords do not match');
    }
    
    if (formData.role === 'doctor' && !formData.specialty) {
      return setError('Specialty is required for doctors');
    }
    
    setLoading(true);

    try {
      const userData = await register(formData);
      localStorage.setItem('hospitalUser', JSON.stringify(userData));
      setUser(userData);
      
      if (userData.role === 'patient') {
        navigate('/patient-dashboard');
      } else {
        navigate('/doctor-dashboard');
      }
    } catch (error) {
      setError(error.message || 'Failed to register');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card mx-auto" style={{ maxWidth: '500px' }}>
      <h2 className="text-center">Register</h2>
      
      {error && <div className="text-danger mb-4">{error}</div>}
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Full Name</label>
          <input
            type="text"
            id="name"
            name="name"
            className="form-control"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            className="form-control"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            className="form-control"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            className="form-control"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="phone">Phone Number</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            className="form-control"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="form-group">
          <label>Register as</label>
          <div>
            <label style={{ marginRight: '1rem' }}>
              <input
                type="radio"
                name="role"
                value="patient"
                checked={formData.role === 'patient'}
                onChange={handleChange}
              /> Patient
            </label>
            <label>
              <input
                type="radio"
                name="role"
                value="doctor"
                checked={formData.role === 'doctor'}
                onChange={handleChange}
              /> Doctor
            </label>
          </div>
        </div>
        
        {formData.role === 'doctor' && (
          <div className="form-group">
            <label htmlFor="specialty">Specialty</label>
            <select
              id="specialty"
              name="specialty"
              className="form-control"
              value={formData.specialty}
              onChange={handleChange}
            >
              <option value="">Select Specialty</option>
              <option value="Cardiology">Cardiology</option>
              <option value="Dermatology">Dermatology</option>
              <option value="Neurology">Neurology</option>
              <option value="Orthopedics">Orthopedics</option>
              <option value="Pediatrics">Pediatrics</option>
              <option value="Psychiatry">Psychiatry</option>
              <option value="Gynecology">Gynecology</option>
              <option value="General Physician">General Physician</option>
            </select>
          </div>
        )}
        
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? 'Loading...' : 'Register'}
        </button>
      </form>
      
      <div className="mt-4 text-center">
        Already have an account? <Link to="/login">Login</Link>
      </div>
    </div>
  );
};

export default Register;