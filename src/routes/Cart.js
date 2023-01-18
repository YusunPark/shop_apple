import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Table } from 'react-bootstrap';
import { changeName, changeNum } from './../store.js';

function Cart() {
  let data = useSelector((state) => {
    return state;
  });

  let dispatch = useDispatch();
  return (
    <div>
      <Table>
        <thead>
          <tr>
            <th>#</th>
            <th>상품명</th>
            <th>수량</th>
            <th>변경하기</th>
          </tr>
        </thead>
        <tbody>
          {data.data.map((item, idx) => {
            return (
              <tr key={idx}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.count}</td>
                <td>Click!</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      <div>{data.user}</div>
      <button
        onClick={() => {
          dispatch(changeName());
        }}
      >
        'john' 추가 버튼임
      </button>
    </div>
  );
}

export default Cart;
