import React, { useContext, useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import styled from 'styled-components';
import { Button, InputGroup, Nav } from 'react-bootstrap';
import './Detail.css';
import { Context1 } from '../App.js';
import { useDispatch } from 'react-redux';
import { create } from '../store/dataSlice.js';

let Box = styled.div`
  padding: 20px;
  color: grey;
`;

function Detail(props) {
  let { id } = useParams();
  let info = props.shoes.find((e) => {
    return Number(id) === e.id;
  });
  let [show, setShow] = useState(true);
  let [alertms, setAlert] = useState(false);
  let [value, setValue] = useState('');
  let [tab, setTab] = useState(0);
  let [fade, setFade] = useState('');
  let { stock } = useContext(Context1);
  let dispatch = useDispatch();
  let isWatched = JSON.parse(localStorage.getItem('watched'));
  console.log(isWatched);
  if (info.id in isWatched) {
    console.log('Asdf');
  } else {
    console.log('Asdasdfadsff');

    isWatched.push(info.id);
    localStorage.setItem('watched', JSON.stringify(isWatched));
  }

  useEffect(() => {
    let timer = setTimeout(() => setShow(false), 2000);
    setTimeout(() => {
      setFade('end');
    }, 1000);
    // useEffect 실행전에 return 안의 내용이 먼저 실행됨 -> 기존에 존재하던 타이머 삭제용
    return () => {
      setFade('');
      clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    if (isNaN(value)) {
      setAlert(true);
      alert('그러지마세요');
    } else {
      setAlert(false);
    }
  }, [value]);

  return (
    <div className={`container start ${fade}`}>
      <div className="row">
        <div className="col-md-6">
          <img src={`https://codingapple1.github.io/shop/shoes${info.id + 1}.jpg`} width="100%" alt="item_image" />
        </div>
        <div className="col-md-6">
          <h4 className="pt-5">{info.title}</h4>
          <p>{info.content}</p>
          <p>{info.price}</p>
          <p>{stock}</p>{' '}
          <input
            onChange={(e) => {
              setValue(e.target.value);
            }}
          />
          {alertms ? <Box>그러지마세요..</Box> : null}
          <div>
            <Button variant="primary">주문하기</Button>
            <Button
              variant="secondary"
              onClick={() => {
                dispatch(create({ id: info.id, name: info.title, count: 1 }));
              }}
            >
              장바구니 담기
            </Button>
          </div>
          <Nav variant="tabs" defaultActiveKey="link0">
            <Nav.Item>
              <Nav.Link onClick={() => setTab(0)} eventKey="link0">
                버튼0
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link onClick={() => setTab(1)} eventKey="link1">
                버튼1
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link onClick={() => setTab(2)} eventKey="link2">
                버튼2
              </Nav.Link>
            </Nav.Item>
          </Nav>
          <TabContent tab={tab} />
          <Link to="/cart"> 카트</Link>
        </div>
      </div>
    </div>
  );
}

function TabContent({ tab }) {
  let [fade, setFade] = useState('');
  useEffect(() => {
    setTimeout(() => {
      setFade('end');
    }, 700);
    return () => {
      setFade('');
    };
  }, [tab]);

  return <div className={`start ${fade}`}>{[<div>내용0</div>, <div>내용1</div>, <div>내용2</div>][tab]}</div>;
}

export default Detail;
