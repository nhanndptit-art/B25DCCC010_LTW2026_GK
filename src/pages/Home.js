import React from 'react';

const Home = ({ events, loading, error }) => {
  if (loading) return <p>Đang tải...</p>;
  if (error) return <p>{error}</p>;

  const totalEvents = events.length;
  const totalRegistered = events.reduce((sum, ev) => sum + ev.registered, 0);
  const fullEventsCount = events.reduce(
    (count, ev) => (ev.registered >= ev.capacity ? count + 1 : count),
    0
  );

  return (
    <div>
      <h1>Sự kiện CLB</h1>
      <p>{`Tổng số sự kiện: ${totalEvents}`}</p>
      <p>{`Tổng số lượt đăng ký: ${totalRegistered}`}</p>
      <p>{`Số sự kiện đã đầy: ${fullEventsCount}`}</p>
    </div>
  );
};

export default Home;