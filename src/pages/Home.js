import React from 'react';

const Home = ({ loading, error }) => {
  if (loading) return <p>Đang tải...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>Sự kiện CLB</h1>
    </div>
  );
};

export default Home;