import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddClassForm = ({ fetchClasses }) => {
  const navigate = useNavigate();
  const [classData, setClassData] = useState({
    name: '',
    day: '',
    time: '',
    instructor: '',
    duration: '',
    spots: '',
    spotsAvailable: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    const processedValue = name === 'spots' ? parseInt(value) : value;
    
    setClassData(prev => ({
      ...prev,
      [name]: processedValue,
      ...(name === 'spots' ? { spotsAvailable: processedValue } : {})
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formattedTime = classData.time.length === 5 
      ? `${classData.time}:00` 
      : classData.time;

    const formattedData = {
      ...classData,
      time: formattedTime
    };

    try {
      await axios.post('http://localhost:5001/api/classes', formattedData);
      await fetchClasses();
      alert('Class added successfully!');
      navigate('/'); // Redirect to booking page after successful addition
    } catch (error) {
      console.error('Error details:', error.response?.data || error.message);
      alert(`Failed to add class: ${error.response?.data?.error || error.message}`);
    }
  };

  return (
    <div className="add-class-form-container">
      <form onSubmit={handleSubmit} className="add-class-form">
        <div className="form-grid">
          <div className="form-group">
            <label>Class Name</label>
            <input
              type="text"
              name="name"
              value={classData.name}
              onChange={handleChange}
              required
              placeholder="e.g., Yoga Special"
            />
          </div>

          <div className="form-group">
            <label>Day</label>
            <select 
              name="day" 
              value={classData.day} 
              onChange={handleChange} 
              required
            >
              <option value="">Select Day</option>
              <option value="Monday">Monday</option>
              <option value="Tuesday">Tuesday</option>
              <option value="Wednesday">Wednesday</option>
              <option value="Thursday">Thursday</option>
              <option value="Friday">Friday</option>
              <option value="Saturday">Saturday</option>
              <option value="Sunday">Sunday</option>
            </select>
          </div>

          <div className="form-group">
            <label>Time</label>
            <input
              type="time"
              name="time"
              value={classData.time}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Instructor</label>
            <input
              type="text"
              name="instructor"
              value={classData.instructor}
              onChange={handleChange}
              required
              placeholder="e.g., Sophie"
            />
          </div>

          <div className="form-group">
            <label>Duration</label>
            <input
              type="text"
              name="duration"
              value={classData.duration}
              onChange={handleChange}
              required
              placeholder="e.g., 55m"
            />
          </div>

          <div className="form-group">
            <label>Total Spots</label>
            <input
              type="number"
              name="spots"
              value={classData.spots}
              onChange={handleChange}
              required
              min="1"
              placeholder="e.g., 20"
            />
          </div>
        </div>

        <div className="form-actions">
          <button type="submit" className="submit-button">Add Class</button>
          <button 
            type="button" 
            className="cancel-button"
            onClick={() => navigate('/')}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddClassForm;