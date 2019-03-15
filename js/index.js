// Make global board (populated in init)
let squares = [];

// Some copy constants:
const FIRST_PLAYER_MARK = 'X';
const SECOND_PLAYER_MARK = 'O';
const INITIAL_MESSAGE = 'Welcome to Tic Tac Toe!';
const FIRST_PLAYER_TURN_MESSAGE = `It's ${FIRST_PLAYER_MARK}'s turn!`;
const SECOND_PLAYER_TURN_MESSAGE = `It's ${SECOND_PLAYER_MARK}'s turn!`;
const TIED_MESSAGE = `You tied! Again! (I'm assuming it's "again". It's usually a tie.) Want to play again anyway?`;
const FIRST_PLAYER_WINS_MESSAGE = `${FIRST_PLAYER_MARK} wins! Play again?`;
const SECOND_PLAYER_WINS_MESSAGE = `${SECOND_PLAYER_MARK} wins! Play again?`
const STANDARD_COLOR = 'black';
const DONE_COLOR = 'red';

// Global state variables.
let currentMark = FIRST_PLAYER_MARK;
let gameIsOver = false;

// When the page loads, launch our initialization function.
window.onload = init;

function init() { 
  // Add each of the HTML nodes to an array.
  // This is done using the weird fallback behavior a student of mine found
  // accidentally. Essentially, if there's no variable anywhere up the scope, 
  // browsers will look for a matching id on an html node and use that node as a
  //  sort of mega-global variable.
  // Calling this the Fallback Framework for wont of a better term.
  // Other names include:
  // global node id variables
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

  // Put an event listener on each of the squares in the array above.
  for(let i = 0; i < squares.length; i++) {
    squares[i].addEventListener('click', clickSquare);
  }

  // Throw our welcome message from above on the page and reset its color.
  // Grabs the #game_message node in the same way as the squares above.
  game_message.innerText = INITIAL_MESSAGE;
  game_message.style.color = STANDARD_COLOR;

  // Same method as above, but places an event listener on the reset button.
  reset.addEventListener('click', resetGame);
}

// Handle a click on any square.
function clickSquare(event) {
  event.preventDefault();

  // Grab the node the old fashioned way, by identifying where the event
  // originated.
  const square = event.target;

  // If we're not done or clicking on an already-played square..
  if (square.innerText === '' && gameIsOver === false) {
    square.innerText = currentMark;
    const boardIsFilled = isBoardFilled();
    const someoneWon = didSomeoneWin();

    if(someoneWon) {
      gameIsOver = true;
      game_message.innerText = getWinMessage();
      game_message.style.color = DONE_COLOR;
    } else if (boardIsFilled) {
      game_message.innerText = TIED_MESSAGE;
      gameIsOver = true;
      game_message.style.color = DONE_COLOR;
    } else {
      game_message.innerText = getTurnMessage();
      currentMark = getNewCurrentMark();
    }
  }
}

// Reset everything.
function resetGame() {
  currentMark = FIRST_PLAYER_MARK;
  gameIsOver = false;
  game_message.innerText = FIRST_PLAYER_TURN_MESSAGE;
  game_message.style.color = STANDARD_COLOR;

  for(let i = 0; i < squares.length; i++) {
    squares[i].innerText = '';
  }
}

// Who just won?
function getWinMessage() {
  return currentMark === FIRST_PLAYER_MARK
    ? FIRST_PLAYER_WINS_MESSAGE
    : SECOND_PLAYER_WINS_MESSAGE;
}

// Whose turn is it next?
function getTurnMessage() {
  return currentMark === FIRST_PLAYER_MARK
    ? SECOND_PLAYER_TURN_MESSAGE
    : FIRST_PLAYER_TURN_MESSAGE;
}

// What mark should be next?
function getNewCurrentMark() {
  return currentMark === FIRST_PLAYER_MARK
    ? SECOND_PLAYER_MARK
    : FIRST_PLAYER_MARK;
}

// Tests whether the board is filled.
function isBoardFilled() {
  for (let i = 0; i < squares.length; i++) {
    if (squares[i].innerText === '') {
      return false;
    }
  }
  
  return true;
}

function didSomeoneWin() {
  // Regular Expressions strategy.
  // Probably not the best regexes.
  // But getting some practice in.

  // Build up string based on our board.
  let marks = '';
  for (let i = 0; i < squares.length; i++) {
    const char = squares[i].innerText;
    marks += char === ''
      ? ' '
      : char;
  }

  // Regexes.
  const firstRow = RegExp(
    `${currentMark}{3}.{6}`
  );
  const secondRow = RegExp(
    `.{3}${currentMark}{3}.{3}`
  );
  const thirdRow = RegExp(
    `.{6}${currentMark}{3}`
  );
  const firstCol = RegExp(
    `${currentMark}{1}.{2}`.repeat(3)
  );
  const secondCol = RegExp(
    `.{1}${currentMark}{1}.{1}`.repeat(3)
  );
  const thirdCol = RegExp(
    `.{2}${currentMark}{1}`.repeat(3)
  );
  const southEastDiag = RegExp(
    `${currentMark}{1}.{3}${currentMark}{1}.{3}${currentMark}{1}`
  );
  const northEastDiag = RegExp(
    `.{2}${currentMark}{1}.{1}${currentMark}{1}.{1}${currentMark}{1}.{2}`
  );

  // Make an array of them.
  const regularExpressions = [
    firstRow,
    secondRow,
    thirdRow,
    firstCol,
    secondCol,
    thirdCol,
    southEastDiag,
    northEastDiag
  ];

  // Return true if any of those regexes match our board.
  return regularExpressions.some(regularExpression => regularExpression.test(marks));
}