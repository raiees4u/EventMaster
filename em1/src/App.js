import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/NavBar';
import HomePage from './components/HomePage';
import SignUpPage from './components/SignUpPage';
import MyProfile from './components/ProfilePage'
// import MyProfile from './components/ProfilePage'
import SignInPage from './components/SignInPage';
import EventPage from './components/EventPage';
import { getEvents } from './services/api';
import '../src/styles.css'

function App() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await getEvents();
        setEvents(response.data);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };
    fetchEvents();
  }, []);

  return (
    <div className="container">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage events={events} />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/profile" element={<MyProfile />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/signin" element={<SignInPage />} />
          <Route path="/events" element={<EventPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
