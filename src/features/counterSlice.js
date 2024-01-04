import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: 0,
  status1: false,
  status2: false,

  status3: false,
  status4: false,
  status5: false,
  switch: false,
  

};



export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment: (state) => {
    
      state.value += 1;
    },
    game1: (state)=>{
      state.status1 = true;

    },
    game2: (state)=>{
      state.status2 = true;

    },
    game3: (state)=>{
      state.status3 = true;

    },
    game4: (state)=>{
      state.status4 = true;

    },
    game5: (state)=>{
      state.status5 = true;

    },
    turn: (state)=>{
      state.switch = !state.switch;
    },
    restart:(state)=>{
      state.status1 = state.status2 = state.status3 =state.status4 = state.status5 = false;
    }
   
  },
  
  
});

export const { increment, game1, game2, game3, game4, game5, turn, restart} = counterSlice.actions;
export const selectGame1 = (state) => state.counter.status1;
export const selectGame2 = (state) => state.counter.status2;
export const selectGame3 = (state) => state.counter.status3;
export const selectGame4 = (state) => state.counter.status4;
export const selectGame5 = (state) => state.counter.status5;

export const selectCount = (state) => state.counter.value;
export const selectSwitch = (state) => state.counter.switch;


export default counterSlice.reducer;
