import { useState } from 'react';
var win_state = false;
var winner = null;

function Square({ value, onSquareClick }) {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}



function Board({ xIsNext, squares, onPlay, moves }) {
  
    if (!win_state) {
      winner = calculateWinner(squares);
    }
    function handleClick(i) {
      if (calculateWinner(squares) || squares[i]) {
        return;
      }
      const nextSquares = squares.slice();
      if (xIsNext) {
        nextSquares[i] = 'X';
      } else {
        nextSquares[i] = 'O';
      }
      if (!win_state) {
        onPlay(nextSquares);
      }
    }
  
    console.log(winner);
  let status;
  if (win_state) {
    return win(moves, winner, squares);
  } else {
    status = 'Next player: ' + (xIsNext ? 'X' : 'O');
    return update_board(squares, handleClick);
  }
}

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(nextMove) {
    if (nextMove == 0) {
      win_state = false;
    }
    setCurrentMove(nextMove);

  }
  /*Save the lines move history*/
  const moves_history = history.map((squares, move) => {
    let description;
    if (move > 0) {
      description = 'Go to move #' + move;
    } else {
      description = 'Restart';
    }
    return (
      /*Create a line of move set list*/
      <li key={move}>
        <button className="class_btn_name" onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });

  /*Return html */
  return (
    <div className="game">
      
      <div className="board">
        <div className="card_field">
          <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} moves={moves_history} />
        </div>
        
          <Hand />
        </div>

    </div>

  );
}


function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    //console.log (i,squares[b]);
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      win_state = true;
      return squares[a];
    }
  }
  return null;
}


function update_board (squares, handleClick) {

  return (
    <>
      
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>      
    </>
  );
}

function win (moves, winner, squares) {
  
  return (
    
    <div className="win-info">
    <h2 id="winner-text">Winner: {winner}</h2>
    <>
      
      
      <div className="board-end-game">
        <div className="board-row">
          <Square value={squares[0]} />
          <Square value={squares[1]} />
          <Square value={squares[2]} />
        </div>
        <div className="board-row">
          <Square value={squares[3]} />
          <Square value={squares[4]} />
          <Square value={squares[5]} />
        </div>
        <div className="board-row">
          <Square value={squares[6]} />
          <Square value={squares[7]} />
          <Square value={squares[8]} />
        </div>  
      </div>    
    </>
      <div>
      <h3 id="move_set_text">Move set</h3>
      <ol className="moves">{moves}</ol>
      </div>
    </div>
  );
    
  
}

function Hand() {
  console.log("teste");
  return (
    <div className="hand">
    <button width = "200px" className="hand_card" >123</button>
    <button width = "500px" className="hand_card" >123</button>
    <button width = "500px" className="hand_card" >123</button>
    <button width = "500px" className="hand_card" >123</button>
    <button width = "500px" className="hand_card" >123</button>
    </div>
      
  );
}