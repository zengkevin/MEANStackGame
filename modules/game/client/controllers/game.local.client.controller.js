(function () {
  'use strict';

  angular
    .module('game')
    .controller('LocalGameController', GameController);

  GameController.$inject = ['$scope', '$state', 'Authentication'];

  function GameController($scope, $state, Authentication) {
    var vm = this;

    vm.gameTitle = 'Local Game';
    vm.isLocalGame = true;
    vm.gameEnded = false;
    vm.winner = 0;
    vm.gameState = [
        [0,0,0],
        [0,0,0],
        [0,0,0]
    ];
    vm.CURRENT_PLAYER = 1;


    vm.resetBoard = resetBoard;
    vm.cellOnClick = cellOnClick;

    var BLUE_COLOR = '#0000FF',
        RED_COLOR = '#FF0000',
        WHITE_COLOR = '#FFFFFF';

    init();

    function init() {
      // If user is not signed in then redirect back home
      if (!Authentication.user) {
        //$state.go('home');
      }

      var svg = document.getElementById('gameboard'),
            row,
            col,
            cell;


        // attach a click event callback to every clickable game board cell. Cells are named
        // 'cellXY' where X and Y are the row and column respectively from the top corner.
        //
        //  00 | 01 | 02
        // ----+----+----
        //  10 | 11 | 12
        // ----+----+----
        //  20 | 21 | 22

        for (row = 0; row < 3; row++){
            for (col = 0; col < 3; col++){

                cell = svg.getElementById('cell' + row.toString() + col.toString());

                cell.setAttribute('fill', WHITE_COLOR);
            }
        }
    }

    // click event handler for game board cells
    function cellOnClick(x, y)
    {

        if (isValidClick(x, y) === false) {
            return;
        }

        var svg = document.getElementById('gameboard'),
            cell = svg.getElementById('cell' + x + y);

        if (cell !== null) {
            switch (vm.CURRENT_PLAYER) {
                case 1:
                    cell.setAttribute('fill', BLUE_COLOR);
                    vm.gameState[x][y] = vm.CURRENT_PLAYER;
                    vm.CURRENT_PLAYER = 2;
                    break;

                case 2:
                    cell.setAttribute('fill', RED_COLOR);
                    vm.gameState[x][y] = vm.CURRENT_PLAYER;
                    vm.CURRENT_PLAYER = 1;
                    break;

                default:
                    break;
            }
        }

        vm.winner = checkForWinner();
    }


    // Perhaps not necessary, but it doesn't seem right to be able to change the cell.
    function isValidClick(row, col) {
        return vm.gameState[row][col] == 0 && !vm.gameEnded;
    }

    function checkForWinner() {
        // Task 3
console.log("vm.gameState", vm.gameState);
        let squares=[[],[],[]];
        for(let i=0; i<3; i++) {
            for(let j=0; j<3; j++) {
                if(vm.gameState[i][j]==2) squares[i][j] = -1;
                else squares[i][j] = vm.gameState[i][j];
            }
        }
console.log("squares", squares);
        let winner = calculateWinnerInner(squares);
        if (winner !== 0) return winner;
  
        const stranspose = squares.map((col, i) => squares.map(row => row[i]));
        return calculateWinnerInner(stranspose);
    }

    function resetBoard() {
        var row = 3,
            col = 3;

        for (var i = 0; i < row; i++) {
            for (var j = 0; j < col; j++) {

                vm.gameState[i][j] = 0;

                var svg = document.getElementById('gameboard'),
                    cell = svg.getElementById('cell' + i + j);

                if (cell !== null) {
                    cell.setAttribute('fill', WHITE_COLOR);
                }
            }
        }
        vm.winner = 0;
        vm.gameEnded = false;
    }


    function sum(array) {  
        return array.reduce((a, b) =>a + b);
    }

    /**
     * @param {string[]} squares
     * @return {number} 
     *      1 - Win, 0 - Draw, -1 - Lose
     */
    function calculateWinnerInner(squares) {
        var r = 0;
        for (; r < squares.length; r++) {
            if (squares[r].length === sum(squares[r])) return 1;
            if (squares[r].length === - sum(squares[r])) return -1;
        }

        var diagonal = squares.map((row, r) => squares[r][r]);

        if (squares[0].length === sum(diagonal)) return 1;
        if (squares[0].length === -sum(diagonal)) return -1;

        const len=squares.length;
        const crossdiagonal = squares.map((row, r) => squares[r][len-r-1]);

        if (squares[0].length === sum(crossdiagonal)) return 1;
        if (squares[0].length === -sum(crossdiagonal)) return -1;

        return 0;
    }
  }
}());
