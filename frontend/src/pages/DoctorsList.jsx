import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getDoctors } from '../utils/api';

const DoctorsList = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const data = await getDoctors();
        setDoctors(data);
      } catch (error) {
        setError(error.message || 'Failed to load doctors');
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  if (loading) {
    return <div className="text-center">Loading doctors...</div>;
  }

  if (error) {
    return <div className="text-danger text-center">{error}</div>;
  }

  return (
    <div>
      <h1 className="text-center mb-4">Our Doctors</h1>
      
      {doctors.length === 0 ? (
        <div className="text-center">No doctors found</div>
      ) : (
        <div className="grid">
          {doctors.map((doctor) => (
            <div key={doctor._id} className="card">
              <h3>{doctor.name}</h3>
              <p><strong>Specialty:</strong> {doctor.specialty}</p>
              <p><strong>Email:</strong> {doctor.email}</p>
              <p><strong>Phone:</strong> {doctor.phone}</p>
              
              {localStorage.getItem('hospitalUser') ? (
                <Link to={`/book-appointment/${doctor._id}`} className="btn btn-primary">
                  Book Appointment
                </Link>
              ) : (
                <Link to="/login" className="btn btn-secondary">
                  Login to Book
                </Link>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DoctorsList;