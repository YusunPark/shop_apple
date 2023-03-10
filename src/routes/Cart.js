import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Table } from 'react-bootstrap';
import { increase, remove } from '../store/dataSlice.js';
import { changeName, changeAge } from '../store/userSlice.js';

function Cart() {
  let data = useSelector((state) => {
    return state;
  });

  let dispatch = useDispatch();
  return (
    <div>
      <div>
        <div>{data.user.name + data.user.age}의 장바구니</div>
        <button
          onClick={() => {
            dispatch(changeName());
          }}
        >
          이름 변경
        </button>
        <button
          onClick={() => {
            dispatch(changeAge(10));
          }}
        >
          나이 변경
        </button>
      </div>
      <Table>
        <thead>
          <tr>
            <th>#</th>
            <th>상품명</th>
            <th>수량</th>
            <th>변경</th>
            <th>삭제</th>
          </tr>
        </thead>
        <tbody>
          {data.data.map((item, idx) => {
            return (
              <tr key={idx}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.count}</td>
                <td
                  onClick={() => {
                    dispatch(increase(item.id));
                  }}
                >
                  수량 증가!
                </td>
                <td
                  onClick={() => {
                    dispatch(remove(idx));
                  }}
                >
                  삭제
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
}

export default Cart;
