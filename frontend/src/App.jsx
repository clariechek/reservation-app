import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from "axios";
import './App.css';
import BookingPage from './pages/BookingPage';
import SchedulePage from './pages/SchedulePage';
import AddClassPage from './pages/AddClassPage';
import yogaBanner from './assets/yoga-banner.jpg';

/**
 * Main App component
 * Handles routing and global state management
 */
const App = () => {
  // State for managing reservations and classes
  const [reservations, setReservations] = useState([]);
  const [classes, setClasses] = useState([]);

  /**
   * Fetches all reservations from the API
   */
  const fetchReservations = async () => {
    try {
      const response = await axios.get("http://localhost:5001/api/reservations");
      setReservations(response.data);
    } catch (err) {
      console.error("Error fetching reservations:", err);
    }
  };

  /**
   * Fetches all classes from the API
   */
  const fetchClasses = async () => {
    try {
      const response = await axios.get("http://localhost:5001/api/classes");
      setClasses(response.data);
    } catch (err) {
      console.error("Error fetching classes:", err);
    }
  };

  // Fetch data on component mount
  useEffect(() => {
    fetchClasses();
    fetchReservations();
  }, []);

  return (
    <Router>
      <div className="app-wrapper">
        {/* Banner section */}
        {/* <div className="banner">
          <img src={yogaBanner} alt="Yoga class" className="banner-image" />
          <div className="banner-content">
            <h1>BOOK NOW</h1>
          </div>
        </div> */}

        <div className="app-container">
          {/* Header with navigation */}
          <header className="header">
            <div className="logo">
              {/* <span className="om-symbol">ॐ</span> */}
              <div>
                <h2>Fitness Studio</h2>
                {/* <p>Mindful fitness directory</p> */}
              </div>
            </div>
            <nav className="nav-menu">
              <Link to="/" className="nav-link">Book Classes</Link>
              <Link to="/schedule" className="nav-link">Schedule</Link>
              <Link to="/add-class" className="nav-link">Add Class</Link>
            </nav>
          </header>

          {/* Main content and routes */}
          <main className="main-content">
            <Routes>
              <Route path="/" element={<BookingPage classes={classes} fetchReservations={fetchReservations} />} />
              <Route path="/schedule" element={<SchedulePage reservations={reservations} />} />
              <Route path="/add-class" element={<AddClassPage fetchClasses={fetchClasses} />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
};

export default App;
