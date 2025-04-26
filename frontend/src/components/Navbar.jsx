import { Link, useNavigate } from 'react-router-dom';

const Navbar = ({ user, setUser }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('hospitalUser');
    setUser(null);
    navigate('/');
  };

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-brand">Hospital Appointments</Link>
      <ul className="navbar-nav">
        <li>
          <Link to="/" className="nav-link">Home</Link>
        </li>
        <li>
          <Link to="/doctors" className="nav-link">Doctors</Link>
        </li>
        {user ? (
          <>
            <li>
              <Link 
                to={user.role === 'patient' ? '/patient-dashboard' : '/doctor-dashboard'} 
                className="nav-link"
              >
                Dashboard
              </Link>
            </li>
            <li>
              <button onClick={handleLogout} className="nav-link" style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                Logout
              </button>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/login" className="nav-link">Login</Link>
            </li>
            <li>
              <Link to="/register" className="nav-link">Register</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;