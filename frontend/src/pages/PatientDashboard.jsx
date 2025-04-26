import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { getPatientAppointments, updateAppointmentStatus } from '../utils/api';

const PatientDashboard = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [statusMessage, setStatusMessage] = useState('');
  const location = useLocation();

  useEffect(() => {
    // Check for any messages from navigation state
    if (location.state?.message) {
      setStatusMessage(location.state.message);
      // Clear the state message after showing it
      window.history.replaceState({}, document.title);
    }

    fetchAppointments();
  }, [location]);

  const fetchAppointments = async () => {
    try {
      const data = await getPatientAppointments();
      setAppointments(data);
    } catch (error) {
      setError(error.message || 'Failed to load appointments');
    } finally {
      setLoading(false);
    }
  };

  const handleCancelAppointment = async (appointmentId) => {
    if (window.confirm('Are you sure you want to cancel this appointment?')) {
      try {
        await updateAppointmentStatus(appointmentId, 'cancelled');
        setStatusMessage('Appointment cancelled successfully');
        
        // Refresh appointments
        fetchAppointments();
      } catch (error) {
        setError(error.message || 'Failed to cancel appointment');
      }
    }
  };

  // Get user data from localStorage
  const userData = JSON.parse(localStorage.getItem('hospitalUser') || '{}');

  if (loading) {
    return <div className="text-center">Loading your appointments...</div>;
  }

  return (
    <div>
      <h1 className="text-center mb-4">Patient Dashboard</h1>
      
      <div className="card mb-4">
        <h3>Your Information</h3>
        <p><strong>Name:</strong> {userData.name}</p>
        <p><strong>Email:</strong> {userData.email}</p>
        <p><strong>Phone:</strong> {userData.phone}</p>
        <p><strong>Patient ID:</strong> {userData.patientId}</p>
      </div>
      
      {statusMessage && (
        <div className="card mb-4 text-success">
          {statusMessage}
        </div>
      )}
      
      {error && <div className="text-danger mb-4">{error}</div>}
      
      <div className="card">
        <h3>Your Appointments</h3>
        
        {appointments.length === 0 ? (
          <p>You have no appointments scheduled.</p>
        ) : (
          <div>
            {appointments.map((appointment) => (
              <div key={appointment._id} className="card mb-4" style={{ padding: '1rem' }}>
                <div className="d-flex justify-content-between">
                  <div>
                    <h4>Dr. {appointment.doctorId.name}</h4>
                    <p><strong>Specialty:</strong> {appointment.doctorId.specialty}</p>
                    <p><strong>Date:</strong> {new Date(appointment.appointmentDate).toLocaleDateString()}</p>
                    <p><strong>Time:</strong> {appointment.timeSlot}</p>
                    <p><strong>Reason:</strong> {appointment.reason}</p>
                    <p><strong>Status:</strong> <span className={
                      appointment.status === 'scheduled' ? 'text-primary' :
                      appointment.status === 'completed' ? 'text-success' : 'text-danger'
                    }>{appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}</span></p>
                  </div>
                  
                  {appointment.status === 'scheduled' && (
                    <div>
                      <button 
                        onClick={() => handleCancelAppointment(appointment._id)}
                        className="btn btn-secondary"
                      >
                        Cancel
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PatientDashboard;