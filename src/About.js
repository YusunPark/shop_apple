import React from 'react';
import { Outlet } from 'react-router-dom';

function About() {
  return (
    <div>
      <h4>about페이지임</h4>
      <Outlet />
    </div>
  );
}

export default About;
