import React from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

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

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6">
          <img src={`https://codingapple1.github.io/shop/shoes${info.id + 1}.jpg`} width="100%" alt="item_image" />
        </div>
        <div className="col-md-6">
          <h4 className="pt-5">{info.title}</h4>
          <p>{info.content}</p>
          <p>{info.price}</p>
          <button className="btn btn-danger">주문하기</button>
          <YellowBtn>장바구니 담기</YellowBtn>
        </div>
      </div>
    </div>
  );
}

export default Detail;
