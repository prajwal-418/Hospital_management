import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="text-center">
      <h1>Welcome to Hospital Appointment System</h1>
      <p className="mb-4">Book appointments with doctors online with ease</p>
      
      <div className="card mx-auto" style={{ maxWidth: '800px' }}>
        <h2>How it works</h2>
        <ol style={{ textAlign: 'left' }}>
          <li>Create an account or login</li>
          <li>Browse our list of doctors</li>
          <li>Select a doctor and book an appointment</li>
          <li>Get a unique patient ID</li>
          <li>Manage your appointments from your dashboard</li>
        </ol>
        
        <div className="mt-4">
          <Link to="/doctors" className="btn btn-primary">View Doctors</Link>
        </div>
      </div>
    </div>
  );
};

export default Home;