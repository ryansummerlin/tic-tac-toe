const Screen = require("./screen");
const Cursor = require("./cursor");

class TTT {

  constructor() {

    this.playerTurn = "O";

    this.grid = [[' ',' ',' '],
                 [' ',' ',' '],
                 [' ',' ',' ']]

    this.cursor = new Cursor(3, 3);

    // Initialize a 3x3 tic-tac-toe grid
    Screen.initialize(3, 3);
    Screen.setGridlines(true);
    Screen.setMessage(`It is ${this.playerTurn}'s turn`);
    Screen.render();

    // Replace this with real commands
    Screen.addCommand('h', 'print list of command', Screen.printCommands);
    Screen.addCommand('u', 'move cursor up', this.cursorUp);
    Screen.addCommand('d', 'move cursor down', this.cursorDown);
    Screen.addCommand('r', 'move cursor to the right', this.cursorRight);
    Screen.addCommand('l', 'move cursor to the left', this.cursorLeft);
    Screen.addCommand('p', 'place move', this.placeMove);

    Screen.render();
  }



  cursorUp = () => {
    this.cursor.up();
  }

  cursorDown = () => {
    this.cursor.down();
  }

  cursorRight = () => {
    this.cursor.right();
  }

  cursorLeft = () => {
    this.cursor.left();
  }

  switchPlayer = () => {
    if (this.playerTurn === 'X') {
      this.playerTurn = 'O';
    } else {
      this.playerTurn = 'X';
    }
  }

  placeMove = () => {
    if (this.grid[this.cursor.row][this.cursor.col] === ' ') {
      Screen.setGrid(this.cursor.row, this.cursor.col, this.playerTurn);
      this.grid[this.cursor.row][this.cursor.col] = this.playerTurn;

      let win = TTT.checkWin(this.grid);
      this.switchPlayer();
      if (win) {
        TTT.endGame(win);
      }
      Screen.setMessage(`It is ${this.playerTurn}'s turn`);
    } else {
      Screen.setMessage("Choose an open spot");
    }

    Screen.render();
  }

  static checkWin(grid) {
    let emptyGrid = grid.map(el => !el.includes('X') && !el.includes('O'));
    let xWinHorizontal = grid.map(el => (el[0] === 'X' && el[1] === 'X' && el[2] === 'X'));
    let oWinHorizontal = grid.map(el => (el[0] === 'O' && el[1] === 'O' && el[2] === 'O'));
    let tie = grid.map(el => el.includes(' '));

    let xWinVertical = [];
    let oWinVertical = [];
    let xWinDiagonal = false;
    let oWinDiagonal = false;

    // check for vertical wins
    for (let i = 0; i < 3; i++) {
      if (grid[0][i] === 'X' && grid[1][i] === 'X' && grid[2][i] === 'X') {
        xWinVertical.push(true);
      } else if(grid[0][i] === 'O' && grid[1][i] === 'O' && grid[2][i] === 'O') {
        oWinVertical.push(true);
      } else {
        xWinVertical.push(false);
        oWinVertical.push(false);
      }
    }

    // check for diagonal wins
    if (grid[0][0] === 'X' && grid[1][1] === 'X' && grid[2][2] === 'X') {
      xWinDiagonal = true;
    } else if (grid[0][0] === 'O' && grid[1][1] === 'O' && grid[2][2] === 'O') {
      oWinDiagonal = true;
    } else if (grid[0][2] === 'X' && grid[1][1] === 'X' && grid[2][0] === 'X') {
      xWinDiagonal = true;
    } else if (grid[0][2] === 'O' && grid[1][1] === 'O' && grid[2][0] === 'O') {
      oWinDiagonal = true;
    }


    if (!emptyGrid.includes(false)) {
      return false;
    } else if (xWinHorizontal.includes(true) || xWinVertical.includes(true) || xWinDiagonal === true) {
      return 'X';
    } else if (oWinHorizontal.includes(true) || oWinVertical.includes(true) || oWinDiagonal === true) {
      return 'O';
    } else if (!tie.includes(true)) {
      return 'T';
    } else {
      return false;
    }

    // Return 'X' if player X wins
    // Return 'O' if player O wins
    // Return 'T' if the game is a tie
    // Return false if the game has not ended

  }

  static endGame(winner) {
    if (winner === 'O' || winner === 'X') {
      Screen.setMessage(`Player ${winner} wins!`);
    } else if (winner === 'T') {
      Screen.setMessage(`Tie game!`);
    } else {
      Screen.setMessage(`Game Over`);
    }
    Screen.render();
    Screen.quit();
  }

}

module.exports = TTT;
