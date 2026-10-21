import React, { useState } from 'react';
import FilterBar from '../components/FilterBar';
import EventTable from '../components/EventTable';

const EventList = ({ events, loading, error, onRegister, onDelete }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('Tất cả');

  if (loading) return <p>Đang tải...</p>;
  if (error) return <p>{error}</p>;

  const filteredEvents = events.filter((ev) => {
    const matchesName = ev.name
      .toLowerCase()
      .includes(searchTerm.trim().toLowerCase());

    let matchesStatus = true;
    if (statusFilter === 'Còn chỗ') {
      matchesStatus = ev.registered < ev.capacity;
    } else if (statusFilter === 'Đã đầy') {
      matchesStatus = ev.registered >= ev.capacity;
    }

    return matchesName && matchesStatus;
  });

  return (
    <div>
      <FilterBar
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        statusFilter={statusFilter}
        onStatusChange={setStatusFilter}
      />
      <p>{`Tìm thấy ${filteredEvents.length} sự kiện`}</p>
      {filteredEvents.length === 0 ? (
        <p>Không có dữ liệu</p>
      ) : (
        <EventTable
          events={filteredEvents}
          onRegister={onRegister}
          onDelete={onDelete}
        />
      )}
    </div>
  );
};

export default EventList;