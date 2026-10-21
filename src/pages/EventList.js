import React from 'react';
import EventTable from '../components/EventTable';

const EventList = ({ events, loading, error, onRegister, onDelete }) => {
  if (loading) return <p>Đang tải...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <EventTable
        events={events}
        onRegister={onRegister}
        onDelete={onDelete}
      />
    </div>
  );
};

export default EventList;
