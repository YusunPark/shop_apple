import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { Nav } from 'react-bootstrap';

let Box = styled.div`
  padding: 20px;
  color: grey;
`;
let YellowBtn = styled.button`
  background: yellow;
  color: black;
  padding: 10px;
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

  useEffect(() => {
    let timer = setTimeout(() => setShow(false), 2000);
    // useEffect 실행전에 return 안의 내용이 먼저 실행됨 -> 기존에 존재하던 타이머 삭제용
    return () => {
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
    <div className="container">
      <input
        onChange={(e) => {
          setValue(e.target.value);
        }}
      />
      {alertms ? <Box>그러지마세요..</Box> : null}
      <div className="row">
        <div className="col-md-6">
          <img src={`https://codingapple1.github.io/shop/shoes${info.id + 1}.jpg`} width="100%" alt="item_image" />
        </div>
        <div className="col-md-6">
          <h4 className="pt-5">{info.title}</h4>
          <p>{info.content}</p>
          <p>{info.price}</p>
          <button className="btn btn-danger">주문하기</button>
          {show ? <YellowBtn>장바구니 담기</YellowBtn> : null}
        </div>
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
    </div>
  );
}

function TabContent({tab}) {
  return [<div>내용0</div>, <div>내용1</div>, <div>내용2</div>][tab];
}

export default Detail;
