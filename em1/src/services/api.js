import axios from 'axios';

// Set up a default Axios instance with base URL for the backend API
const api = axios.create({
    baseURL: 'http://localhost:5000/api', // replace with your backend URL
    headers: {
        'Content-Type': 'application/json',
    },
});
const token = localStorage.getItem('token');

// Fetch all events from the backend
export const getEvents = async () => {
    try {
        // Replace 'authToken' with your actual key
        const response = await api.get('/events', {
            headers: {
                Authorization: `Bearer ${token}`,
            },


        });
        return response;
    } catch (error) {
        console.error("Error fetching events:", error);
        throw error;
    }
};

// Fetch a single event by ID
export const getEventById = async (id) => {
    try {
        const response = await api.get(`/events/${id}`);
        return response;
    } catch (error) {
        console.error("Error fetching event:", error);
        throw error;
    }
};

// Create a new event
export const createEvent = async (eventData) => {
    try {
        const response = await api.post('/events', eventData, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response;
    } catch (error) {
        console.error("Error creating event:", error);
        throw error;
    }
};

// Update an existing event
export const updateEvent = async (id, eventData) => {
    try {
        const response = await api.put(`/events/${id}`, eventData, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response;
    } catch (error) {
        console.error("Error updating event:", error);
        throw error;
    }
};

// Delete an event by ID
export const deleteEvent = async (id) => {
    try {
        const response = await api.delete(`/events/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response;
    } catch (error) {
        console.error("Error deleting event:", error);
        throw error;
    }
};

// Sign up a new user
export const signUpUser = async (userData) => {
    try {
        const response = await api.post('/users/register', userData);
        return response.data;  // Return response data (success message)
    } catch (error) {
        console.error("Registration error: ", error);
        throw error.response.data;  // Return error message from backend
    }
};



// Sign in an existing user
export const signInUser = async (userData) => {
    try {

        const response = await api.post('users/login', userData);
        return response;
    } catch (error) {
        console.error("Error signing in:", error);
        throw error;
    }
};

export const getUserDetails = async () => {
    const token = localStorage.getItem('token'); // Get token from localStorage
    if (!token) throw new Error('No token found');

    try {
        const response = await api.get('/users/myprofile', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching user details:', error);
        throw error;
    }
};


