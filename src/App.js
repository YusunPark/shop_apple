import 'bootstrap/dist/css/bootstrap.css';
import { useState } from 'react';
import { Button, Navbar, Container, Nav } from 'react-bootstrap';
import { Routes, Route, Link, useNavigate, Outlet } from 'react-router-dom';

import './App.css';
import data from './data.js';
import Detail from './Detail';
import About from './About';
import Event from './Event';
import axios from 'axios';

function App() {
  let [shoes, setShoes] = useState(data);
  return (
    <div>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">Navbar</Navbar.Brand>
          <Nav className="me-auto">
            <Link to="/">Home</Link>
            <Link to="/detail">Detail</Link>
            <Link to="/event">Event</Link>
          </Nav>
        </Container>
      </Navbar>
      <div className="main-bg" />

      <Routes>
        <Route
          path="/"
          element={
            <div className="container">
              <button
                onClick={() => {
                  let copy = [...shoes];
                  copy.sort(function (a, b) {
                    if (a.title > b.title) return 1;
                    if (a.title < b.title) return -1;
                    return 0;
                  });
                  setShoes(copy);
                }}
              >
                정렬
              </button>
              <div className="row">
                {shoes.map((info, idx) => {
                  return (
                    <div key={idx}>
                      <Item shoes={info} /> <Link to={`/detail/${info.id}`}>상세페이지</Link>
                    </div>
                  );
                })}
              </div>
              <button
                onClick={() => {
                  axios
                    .get('https://codingapple1.github.io/shop/data2.json')
                    .then((res) => {
                      console.log(res.data);
                      let copy = [...shoes];
                      copy = copy.concat(res.data);
                      setShoes(copy);
                      console.log(copy);
                    })
                    .catch((err) => {
                      console.log('error : ', err);
                    });
                }}
              >
                axios
              </button>
            </div>
          }
        />
        <Route path="/detail/:id" element={<Detail shoes={shoes} />} />
        <Route path="/about" element={<About />}>
          <Route path="member" element={<div>멤버들</div>} />
          <Route path="location" element={<div>회사위치</div>} />
        </Route>{' '}
        <Route path="/event" element={<Event />}>
          <Route path="one" element={<div>첫 주문시 양배추즙 서비스</div>} />
          <Route path="two" element={<div>생일기념 쿠폰받기</div>} />
        </Route>{' '}
        <Route path="*" element={<div>없는페이지임</div>} />
      </Routes>
    </div>
  );
}

function Item(props) {
  return (
    <div className="col-md-4">
      <img
        src={`https://codingapple1.github.io/shop/shoes${props.shoes.id * 1 + 1}.jpg`}
        width="80%"
        alt="shoes_image"
      />
      <h4>{props.shoes.title}</h4>
      <p>{props.shoes.price}</p>
    </div>
  );
}

export default App;
