import 'bootstrap/dist/css/bootstrap.css';
import React, { useState, useEffect } from 'react';
import { Button, Navbar, Container, Nav, Card } from 'react-bootstrap';
import { Routes, Route, Link, useNavigate, Outlet } from 'react-router-dom';

import './App.css';
import data from './data.js';
import Detail from './routes/Detail';
import About from './routes/About';
import Event from './routes/Event';
import Cart from './routes/Cart';
import axios from 'axios';

export let Context1 = React.createContext();

function App() {
  let [shoes, setShoes] = useState(data);
  let [stock, setStock] = useState([10, 11, 12]);

  useEffect(() => {
    if (localStorage.getItem('watched') === null) {
      localStorage.setItem('watched', JSON.stringify([]));
    }
  }, []);

  let watched = '' || JSON.parse(localStorage.getItem('watched'));

  return (
    <div>
      <Navbar bg="white" variant="white">
        <Container>
          <Navbar.Brand href="/">Shop</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/cart">Cart</Nav.Link>
            <Nav.Link href="/event">Event</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <div className="main-bg" />

      <Routes>
        <Route
          path="/"
          element={
            <div className="App">
              <div>
                <Button
                  variant="secondary"
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
                  이름순 정렬
                </Button>
                <Button
                  variant="secondary"
                  onClick={() => {
                    axios
                      .get('https://codingapple1.github.io/shop/data2.json')
                      .then((res) => {
                        console.log(res.data);
                        let copy = [...shoes, ...res.data];
                        setShoes(copy);
                        console.log(copy);
                      })
                      .catch((err) => {
                        console.log('error : ', err);
                      });
                  }}
                >
                  아이템 더 불러오기
                </Button>
              </div>
              <div style={{ display: 'flex' }}>
                <div>
                  {shoes.map((info, idx) => {
                    return (
                      <div key={idx}>
                        <Item shoes={info} />
                      </div>
                    );
                  })}
                </div>
                <Card style={{ width: '8rem' }}>
                  <Card.Header>최근 본 상품</Card.Header>
                  <Card.Body>
                    {watched.map((idx) => {
                      return (
                        <Card.Img
                          key={idx}
                          variant="top"
                          src={`https://codingapple1.github.io/shop/shoes${idx * 1 + 1}.jpg`}
                        />
                      );
                    })}
                  </Card.Body>
                </Card>
              </div>
            </div>
          }
        />
        <Route
          path="/detail/:id"
          element={
            <Context1.Provider value={{ stock }}>
              <Detail shoes={shoes} />
            </Context1.Provider>
          }
        />
        <Route path="/cart" element={<Cart />} />
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
    <div>
      <Card style={{ width: '25rem' }}>
        <Card.Img variant="top" src={`https://codingapple1.github.io/shop/shoes${props.shoes.id * 1 + 1}.jpg`} />
        <Card.Body>
          <Card.Title>{props.shoes.title}</Card.Title>
          <Card.Text>{props.shoes.price} </Card.Text>
          <Button variant="primary" href={`/detail/${props.shoes.id}`}>
            상세페이지
          </Button>
        </Card.Body>
      </Card>
    </div>
  );
}

export default App;
