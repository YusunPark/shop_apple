import React from 'react';
import { useNavigate, Outlet } from 'react-router-dom';

function Event() {
  let navigate = useNavigate();
  return (
    <div>
      <h1>오늘의 이벤트!</h1>
      <div
        onClick={() => {
          navigate('/event/one');
        }}
      >
        첫번째 이벤트로 이동하기!
      </div>
      <div
        onClick={() => {
          navigate('/event/two');
        }}
      >
        두번째 이벤트로 이동하기!
      </div>
      <Outlet />
    </div>
  );
}

export default Event;
