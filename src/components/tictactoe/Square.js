import React from 'react'
import './Square.css'
const Square = ({ value, onClick }) => (
    <button className={ value ==='X' ? "square X":(value==='O'? "square O" : "square clear")} onClick={onClick}>
      {value ? value: 'i'}
    </button>
  );

export default Square