import React, { useState, useEffect } from 'react';
import Square from './Square';


function Board ({ initialBoard, matrix, squares, onClick }) {
    
    
    return (
        <div className="board">
            {squares.map((square, index) => (
                <React.Fragment key={index}>
                <Square value={square} onClick={() => onClick(index)} />
                {(index + 1) % matrix === 0 && index !== matrix*matrix - 1 && <br />}
                </React.Fragment>
            ))}
            </div>
    )
    

};

export default Board