import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getDoctors, bookAppointment } from '../utils/api';

const BookAppointment = () => {
  const { doctorId } = useParams();
  const navigate = useNavigate();
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    appointmentDate: '',
    timeSlot: '',
    reason: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        const doctors = await getDoctors();
        const selectedDoctor = doctors.find(doc => doc._id === doctorId);
        
        if (!selectedDoctor) {
          setError('Doctor not found');
        } else {
          setDoctor(selectedDoctor);
        }
      } catch (error) {
        setError(error.message || 'Failed to load doctor');
      } finally {
        setLoading(false);
      }
    };

    fetchDoctor();
  }, [doctorId]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError('');
    setSubmitting(true);

    try {
      await bookAppointment({
        ...formData,
        doctorId
      });
      
      // Redirect to patient dashboard
      navigate('/patient-dashboard', { 
        state: { message: 'Appointment booked successfully!' } 
      });
    } catch (error) {
      setSubmitError(error.message || 'Failed to book appointment');
    } finally {
      setSubmitting(false);
    }
  };

  // Generate time slots from 9 AM to 5 PM
  const timeSlots = [];
  for (let hour = 9; hour <= 17; hour++) {
    const formattedHour = hour % 12 || 12;
    const period = hour < 12 ? 'AM' : 'PM';
    timeSlots.push(`${formattedHour}:00 ${period}`);
    if (hour !== 17) {
      timeSlots.push(`${formattedHour}:30 ${period}`);
    }
  }

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  if (error) {
    return <div className="text-danger text-center">{error}</div>;
  }

  return (
    <div className="card mx-auto" style={{ maxWidth: '600px' }}>
      <h2 className="text-center">Book Appointment</h2>
      
      <div className="mb-4">
        <h3>Doctor Information</h3>
        <p><strong>Name:</strong> {doctor.name}</p>
        <p><strong>Specialty:</strong> {doctor.specialty}</p>
        <p><strong>Email:</strong> {doctor.email}</p>
      </div>
      
      {submitError && <div className="text-danger mb-4">{submitError}</div>}
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="appointmentDate">Appointment Date</label>
          <input
            type="date"
            id="appointmentDate"
            name="appointmentDate"
            className="form-control"
            value={formData.appointmentDate}
            onChange={handleChange}
            // Set min date to current date
            min={new Date().toISOString().split('T')[0]}
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="timeSlot">Time Slot</label>
          <select
            id="timeSlot"
            name="timeSlot"
            className="form-control"
            value={formData.timeSlot}
            onChange={handleChange}
            required
          >
            <option value="">Select Time Slot</option>
            {timeSlots.map((slot) => (
              <option key={slot} value={slot}>{slot}</option>
            ))}
          </select>
        </div>
        
        <div className="form-group">
          <label htmlFor="reason">Reason for Visit</label>
          <textarea
            id="reason"
            name="reason"
            className="form-control"
            value={formData.reason}
            onChange={handleChange}
            rows="3"
            required
          ></textarea>
        </div>
        
        <button type="submit" className="btn btn-primary" disabled={submitting}>
          {submitting ? 'Booking...' : 'Book Appointment'}
        </button>
      </form>
    </div>
  );
};

export default BookAppointment;