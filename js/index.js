// Make global board (populated in init)
let squares = [];

// Some copy constants:
const FIRST_PLAYER_MARK = 'X';
const SECOND_PLAYER_MARK = 'O';
const FIRST_PLAYER_TURN_MESSAGE = `It's ${FIRST_PLAYER_MARK}'s turn!`;
const SECOND_PLAYER_TURN_MESSAGE = `It's ${SECOND_PLAYER_MARK}'s turn!`;
const TIED_MESSAGE = 'You tied! Again! (Probably.)';

// Initial state for easy resets.
const INITIAL_STATE = {
    currentMark: 'X',
    gameStatusMessage: FIRST_PLAYER_TURN_MESSAGE
  }

let {
    currentMark,
    gameIsOver,
    gameStatusMessage
} = INITIAL_STATE;

window.onload = init;

function init() { 
    squares = [
        square_0,
        square_1,
        square_2,
        square_3,
        square_4,
        square_5,
        square_6,
        square_7,
        square_8
    ];

    for(let i = 0; i < squares.length; i++) {
        squares[i].addEventListener('click', clickSquare);
    }
}

function clickSquare(event) {
    event.preventDefault();

    const square = event.target;

    if (square.innerText === '') {
        square.innerText = currentMark;
        const boardIsFilled = isBoardFilled();
        const index = parseFloat(square.id.slice(-1));
        const someoneWon = didSomeoneWin(currentMark, index);

        if(someoneWon) {
            alert(currentMark + ' wins!')
        } else if (boardIsFilled) {
            alert(`It's a tie!`);
        }

        currentMark = currentMark === 'X'
            ? 'O'
            : 'X';
    }
}

function isBoardFilled() {
        for (let i = 0; i < squares.length; i++) {
            if (squares[i].innerText === '') {
                return false;
            }
        }
        
    return true;
}

function didSomeoneWin(mark, index) {
    const col = index % 3;
    const board = [];
    for (let i = 0; i < squares.length; i++) {
        board.push(squares[i].innerText);
    }

    const upOneMatches = board[index - 3] === mark;
    const downOneMatches = board[index + 3] === mark;
    const leftOneMatches = board[index - 1] === mark
      && col > 0;
    const rightOneMatches = board[index + 1] === mark
      && col < 2;

    const upTwoMatches = board[index - 6] === mark;
    const downTwoMatches = board[index + 6] === mark;
    const leftTwoMatches = board[index - 2] === mark
      && col === 2;
    const rightTwoMatches = board[index + 2] === mark
      && col === 0;

    const upOneAndLeftOneMatches = board[index - 4] === mark
      && (index === 4 || index === 8);
    const upOneAndRightOneMatches = board[index - 2] === mark
      && (index === 4 || index === 6);
    const downOneAndLeftOneMatches = board[index + 2] === mark
      && (index === 4 || index === 2);
    const downOneAndRightOneMatches = board[index + 4] === mark
      && (index === 4 || index === 0);
    const upTwoAndLeftTwoMatches = board[0] === mark
      && index === 8;
    const upTwoAndRightTwoMatches = board[2] === mark
      && index === 6;
    const downTwoAndLeftTwoMatches = board[6] === mark
      && index === 2;
    const downTwoAndRightTwoMatches = board[8] === mark
      && index === 0;


    const someoneWon = (upOneMatches && upTwoMatches)
      || (upOneMatches && downOneMatches)
      || (downOneMatches && downTwoMatches)
      || (leftOneMatches && leftTwoMatches)
      || (leftOneMatches && rightOneMatches)
      || (rightOneMatches && rightTwoMatches)
      || (upOneAndLeftOneMatches && upTwoAndLeftTwoMatches)
      || (upOneAndLeftOneMatches && downOneAndRightOneMatches)
      || (downOneAndRightOneMatches && downTwoAndRightTwoMatches)
      || (upOneAndRightOneMatches && upTwoAndRightTwoMatches)
      || (upOneAndRightOneMatches && downOneAndLeftOneMatches)
      || (downOneAndLeftOneMatches && downTwoAndLeftTwoMatches);

    return someoneWon;
}