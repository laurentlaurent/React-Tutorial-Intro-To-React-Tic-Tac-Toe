import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';


/* Replacing the Square class into a function component
  class Square extends React.Component {
  
    render() {
    return (
        // Common Mistake: onClick={alert('click')}
        // This would fire the alert every time the component re-renders
      <button className="square" 
        onClick={() => this.props.onClick()}  // onClick() is defined in Board
      >
        {this.props.value}
      </button>
    );
  }
}*/

function Square(props) {
  return (
    <button className="square"
      // Note the lack of parenthesis on both sides
      onClick={props.onClick}
    >
      {props.value}
    </button>
  )
}

class Board extends React.Component {
  
  /* Deleted: squares and onClick is from Game
  constructor(props)  {
    super(props);
    this.state = {
      squares: Array(9).fill(null),
      xIsNext: true,
    }
  }
  */

  /* Deleted: moved to Game
  handleClick(i) {
    // Here: Use the features of Immutatibility
    // It will allow us to undo/redo (time travel)
    // React will also detect when to re-render (this is about pure components)
    const squares = this.state.squares.slice(); // creates a copy of Square Array
    
    // Don't allow other clicks when there is a winner
    if (calculateWiner(squares) || squares[i]) {
      return;
    }

    
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      squares: squares,
      xIsNext: !this.state.xIsNext,
    });
  }
  */
 
  renderSquare(i) {
    return (
      <Square
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
      />
    );
  }

  render() {
    const winner = calculateWiner(this.state.squares);
    let status;
    if (winner) {
      status = 'Winner: ' + winner;
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }

    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  constructor(props)  {
    super(props);
    this.state = {

      history: [{
        squares: Array(9).fill(null),
      }],

      xIsNext: true,
    };
  }

  handleClick(i) {
    // Here: Use the features of Immutatibility
    // It will allow us to undo/redo (time travel)
    // React will also detect when to re-render (this is about pure components)
    const squares = this.state.squares.slice(); // creates a copy of Square Array
    
    // Don't allow other clicks when there is a winner
    if (calculateWiner(squares) || squares[i]) {
      return;
    }
  }

  render() {
    const history = this.state.history;
    const current = history[history.length - 1];
    const winner = calculateWiner(current.squares);

    let status;
    if (winner) {
      status = 'Winner: ' + winner;
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

// Helper function to calculate winner
function calculateWiner(squares)  {
  const lines = [
    // Horizontal lines
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    // Vertical lines
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    // Diagonals
    [0, 4, 8],
    [2, 4, 6],
  ];

  // Checking if X/O lines
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    // Squares[a] is not null, and has the same values as b and c
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);

