import React from 'react';
import { Link } from 'react-router-dom';

const EventRow = ({ event, onRegister, onDelete }) => {
  const { id, name, location, date, capacity, registered } = event;
  const isFull = registered >= capacity;

  return (
    <tr className={isFull ? 'full-row' : ''}>
      <td>
        <Link to={`/events/${id}`}>{name}</Link>
      </td>
      <td>{location}</td>
      <td>{date}</td>
      <td>{`${registered}/${capacity}`}</td>
      <td>
        <button
          type="button"
          disabled={isFull}
          onClick={() => onRegister(id)}
        >
          Đăng ký
        </button>
        <button
          type="button"
          onClick={() => onDelete(id)}
        >
          Xóa
        </button>
      </td>
    </tr>
  );
};

export default EventRow;