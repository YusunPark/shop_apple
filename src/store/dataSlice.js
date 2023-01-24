import { createSlice } from '@reduxjs/toolkit';

let data = createSlice({
  name: 'data',
  initialState: [
    { id: 0, name: 'White and Black', count: 2 },
    { id: 2, name: 'Grey Yordan', count: 1 },
  ],
  reducers: {
    changeData(state, action) {
      let n = state.findIndex((a) => {
        return a.id === action.payload;
      });
      state[n].count++;
    },
    addData(state, action) {
      state.push(action.payload);
    },
  },
});

export let { changeData, addData } = data.actions;

export default data;
