import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import axios from 'axios';
import './App.css';
import Layout from './components/Layout';
import Home from './pages/Home';
import EventList from './pages/EventList';
import AddEvent from './pages/AddEvent';
import EventDetail from './pages/EventDetail';

const App = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const savedEvents = localStorage.getItem('gk_events');
    if (savedEvents) {
      try {
        setEvents(JSON.parse(savedEvents));
        setLoading(false);
        return;
      } catch (e) {
        // Nếu JSON lỗi thì tiếp tục gọi API bên dưới
      }
    }

    const controller = new AbortController();

    axios
      .get('/data/events.json', { signal: controller.signal })
      .then((res) => {
        setEvents(res.data);
        setLoading(false);
      })
      .catch((err) => {
        if (axios.isCancel(err)) {
          return;
        }
        setError('Không tải được dữ liệu');
        setLoading(false);
      });

    return () => {
      controller.abort();
    };
  }, []);

  useEffect(() => {
    if (!loading && !error) {
      localStorage.setItem('gk_events', JSON.stringify(events));
    }
  }, [events, loading, error]);

  const handleRegister = (id) => {
    setEvents((prevEvents) =>
      prevEvents.map((ev) =>
        ev.id === id && ev.registered < ev.capacity
          ? { ...ev, registered: ev.registered + 1 }
          : ev
      )
    );
  };

  const handleDelete = (id) => {
    setEvents((prevEvents) => prevEvents.filter((ev) => ev.id !== id));
  };

  const handleAdd = (newEventData) => {
    setEvents((prevEvents) => {
      const maxId = prevEvents.reduce(
        (max, ev) => (ev.id > max ? ev.id : max),
        0
      );
      const newEvent = {
        ...newEventData,
        id: maxId + 1,
        capacity: Number(newEventData.capacity),
        registered: 0,
      };
      return [...prevEvents, newEvent];
    });
  };

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route
          index
          element={<Home events={events} loading={loading} error={error} />}
        />
        <Route
          path="events"
          element={
            <EventList
              events={events}
              loading={loading}
              error={error}
              onRegister={handleRegister}
              onDelete={handleDelete}
            />
          }
        />
        <Route
          path="events/new"
          element={
            <AddEvent
              onAdd={handleAdd}
              loading={loading}
              error={error}
            />
          }
        />
        <Route
          path="events/:id"
          element={
            <EventDetail
              events={events}
              loading={loading}
              error={error}
            />
          }
        />
      </Route>
    </Routes>
  );
};

export default App;