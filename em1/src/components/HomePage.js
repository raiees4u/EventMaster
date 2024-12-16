import React from 'react';
import EventPage from './EventPage';
import './Homepage.css'; // Updated to match the components folder structure

function HomePage() {
  return (
    <div className="home-page">
      {/* Hero Section */}
      <header className="hero-section">
        <div className="hero-content">
          <h1>"Welcome to Event Master!"</h1>
          <p>
            Discover exciting events, manage your schedule, and be a part of our growing community!
          </p>
          <button className="cta-button">Explore Events</button>
        </div>
      </header>

      {/* Events Section */}
      <section className="events-section">
        <h2>Upcoming Events</h2>
        <div className="events-container">
          <EventPage />
        </div>
      </section>

      {/* About Section */}
      <section className="about-section">
        <h2>Why Choose Event Master?</h2>
        <p>
          At Event Master, we aim to make event management seamless and accessible. Whether you're organizing a small meetup or a grand conference, we provide the tools and support you need to make it a success.
        </p>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>&copy; 2024 Event Master. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default HomePage;
