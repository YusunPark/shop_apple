import { createSlice } from '@reduxjs/toolkit';

let data = createSlice({
  name: 'data',
  initialState: [
    { id: 0, name: 'White and Black', count: 2 },
    { id: 2, name: 'Grey Yordan', count: 1 },
  ],
  reducers: {
    increase(state, action) {
      let n = state.findIndex((a) => {
        return a.id === action.payload;
      });
      state[n].count++;
    },
    remove(state, action) {
      state.splice(action.payload, 1);
    },
    create(state, action) {
      let n = state.findIndex((a) => {
        return a.id === action.payload.id;
      });
      n === -1 ? state.push(action.payload) : state[n].count++;
    },
  },
});

export let { increase, create, remove } = data.actions;

export default data;
