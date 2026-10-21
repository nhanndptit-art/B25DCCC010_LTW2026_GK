import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Countdown from '../components/Countdown';

const EventDetail = ({ events, loading, error }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  if (loading) return <p>Đang tải...</p>;
  if (error) return <p>{error}</p>;

  const eventId = Number(id);
  const event = events.find((ev) => ev.id === eventId);

  if (!event) {
    return (
      <div>
        <p>Không tìm thấy sự kiện</p>
        <button type="button" onClick={() => navigate(-1)}>
          Quay lại
        </button>
      </div>
    );
  }

  const { name, location, date, registered, capacity } = event;

  return (
    <div>
      <p>{`Tên sự kiện: ${name}`}</p>
      <p>{`Địa điểm: ${location}`}</p>
      <p>{`Ngày: ${date}`}</p>
      <p>{`Số chỗ: ${registered}/${capacity}`}</p>
      <Countdown date={date} />
      <button type="button" onClick={() => navigate(-1)}>
        Quay lại
      </button>
    </div>
  );
};

export default EventDetail;