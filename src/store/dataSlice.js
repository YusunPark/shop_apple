import { createSlice } from '@reduxjs/toolkit';

let data = createSlice({
  name: 'data',
  initialState: [
    { id: 0, name: 'White and Black', count: 2 },
    { id: 2, name: 'Grey Yordan', count: 1 },
  ],
  reducers: {
    changeData(state, action) {
      state.map((item) => {
        if (action.payload.id === item.id) {
          item.count++;
        }
      });
    },
    addData(state, action) {
      state.push(action.payload.id, action.payload.title, 0);
      console.log(action);
    },
  },
});

export let { changeData, addData } = data.actions;

export default data;
