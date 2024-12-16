import React, { useState, useEffect } from 'react';
import { createEvent, updateEvent, deleteEvent, getEvents } from '../services/api';
import './EventPage.css'; // Add CSS for styling

function EventPage() {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');
  const [events, setEvents] = useState([]);
  const [selectedEventId, setSelectedEventId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await getEvents();
        setEvents(response.data);
      } catch (err) {
        setError('Error fetching events. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const handleCreateEvent = async () => {
    try {
      const newEvent = await createEvent({ title, date, description });
      setEvents([...events, newEvent]);
      setTitle('');
      setDate('');
      setDescription('');
      alert('Event created!');
    } catch (err) {
      setError('Error creating event. Please try again.');
    }
  };

  const handleUpdateEvent = async () => {
    try {
      await updateEvent(selectedEventId, { title, date, description });
      setEvents(
        events.map((event) =>
          event._id === selectedEventId ? { ...event, title, date, description } : event
        )
      );
      setSelectedEventId(null);
      setTitle('');
      setDate('');
      setDescription('');
      alert('Event updated!');
    } catch (err) {
      setError('Error updating event. Please try again.');
    }
  };

  const handleDeleteEvent = async (eventId) => {
    try {
      await deleteEvent(eventId);
      setEvents(events.filter((event) => event._id !== eventId));
      alert('Event deleted!');
    } catch (err) {
      setError('Error deleting event. Please try again.');
    }
  };

  const handleSelectEventForUpdate = (event) => {
    setSelectedEventId(event._id);
    setTitle(event.title);
    setDate(event.date);
    setDescription(event.description);
  };

  return (
    <div className="event-page">
      <h1>{selectedEventId ? 'Update Event' : 'Create Event'}</h1>
      {loading && <p>Loading events...</p>}
      {error && <p className="error">{error}</p>}
      
      <div className="event-form">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button onClick={selectedEventId ? handleUpdateEvent : handleCreateEvent}>
          {selectedEventId ? 'Save Changes' : 'Create Event'}
        </button>
      </div>

      <h2>Upcoming Events</h2>
      <div className="events-list">
        {events.length === 0 && !loading && <p>No events available at the moment.</p>}
        {events.map((event) => (
          <EventCard
            key={event._id}
            event={event}
            onUpdate={handleSelectEventForUpdate}
            onDelete={handleDeleteEvent}
          />
        ))}
      </div>
    </div>
  );
}

function EventCard({ event, onUpdate, onDelete }) {
  return (
    <div className="event-card">
      <h2>{event.title}</h2>
      <p>{event.description}</p>
      <p>
        <strong>Date:</strong> {new Date(event.date).toLocaleDateString()}
      </p>
      <button onClick={() => onUpdate(event)}>Update</button>
      <button onClick={() => onDelete(event._id)}>Delete</button>
    </div>
  );
}

export default EventPage;
