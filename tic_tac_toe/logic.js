let currentPlayer = 'X';
        let moves = 0;
        let cells = document.getElementsByClassName('cell');

        function makeMove(event) {
            const cell = event.target;
            if (cell.innerHTML === '') {
                cell.innerHTML = currentPlayer;
                cell.style.color = (currentPlayer === 'X') ? 'blue' : 'red';
                moves++;

                if (checkWin()) {
                    setTimeout(function () {
                        alert('Player ' + currentPlayer + ' wins!');
                        resetGame();
                    }, 100);
                } else if (moves === 9) {
                    setTimeout(function () {
                        alert("It's a draw!");
                        resetGame();
                    }, 100);
                } else {
                    currentPlayer = (currentPlayer === 'X') ? 'O' : 'X';
                }
            }
        }

        function checkWin() {
            const winningCombos = [
                [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
                [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
                [0, 4, 8], [2, 4, 6] // diagonals
            ];

            
            for (let combo of winningCombos) {
                if (cells[combo[0]].innerHTML === currentPlayer &&
                    cells[combo[1]].innerHTML === currentPlayer &&
                    cells[combo[2]].innerHTML === currentPlayer) {
                    return true;
                }
            }
            return false;
        }

        function resetGame() {
            for (let cell of cells) {
                cell.innerHTML = '';
                cell.style.color = 'black';
            }
            currentPlayer = 'X';
            moves = 0;
        }