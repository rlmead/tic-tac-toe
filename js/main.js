// connect to game board div
const board = document.getElementById('board');
// declare some global variables
let game_state, board_state, current_player, winning_combos, message_board, reset_button;

// VIEW - render logic

// declare function to generate html elements
function generate_element(type, id, class_list, parent = false, event = false, event_listener_function = false) {
    let new_element = document.createElement(type);
    new_element.id = id;
    new_element.setAttribute('class', class_list);
    if (event) {
        new_element.addEventListener(event, event_listener_function);
    }
    if (parent) {
        parent.appendChild(new_element);
    }
    return new_element;
}

// declare function to draw all html elements
function init_view() {
    // load empty board
    board.innerHTML = '';
    // create the row that will hold the grid squares
    let grid_parent_row = generate_element('div', 'grid_parent_row', 'row w-50 bg-secondary mx-auto mt-3', board);
    // create the grid squares
    for (let i = 0; i < 9; i++) {
        let new_grid_square = generate_element('div', i, 'col-4 border border-light text-secondary', grid_parent_row, 'click', tile_click);
        new_grid_square.setAttribute('style', 'font-size: 4em');
        new_grid_square.textContent = '-';
    }
    // create an element to communicate current game state
    message_board = generate_element('h1', 'message_board', 'display-4', board);
    // create hidden reset button
    reset_button = generate_element('button', 'reset_button', 'btn btn-danger d-none', board);
    reset_button.textContent = 'play again';
    reset_button.addEventListener('click', init);
}

// MODEL - game logic

// function to initialize game logic
function init_game() {
    // track current state of game by counting up number of turns
    game_state = 0;
    // track current state of board to check for wins
    board_state = ['', '', '', '', '', '', '', '', ''];
    current_player = 'X';
    message_board.textContent = `your turn, player ${current_player}!`;
}

// declare function to check for win or tie
function check_game(player) {
    // declare list of all possible winning grid square index combinations
    // (would it be better to store this as a global variable?)
    let winning_combos = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];
    // check all winning combos to see if the given indexes in the board_state array match the given player
    for (let c of winning_combos) {
        if (c.map((item) => board_state[item]).join('') === player.repeat(3)) {
            return true;
        }
    }
    return false;
}

// CONTROLLER

// initialize the game (same as reset?)
function init() {
    // set view to start
    init_view();
    // set game logic to start
    init_game();
}

// should this be broken apart into separate model/view functions?
// update everything when a player plays
function tile_click(event) {
    // move the game forward upon click
    let tile_id = event.target.id;
    // update game state
    game_state += 1;
    // update board_state array
    board_state[tile_id] = current_player;
    // update the board
    event.target.textContent = current_player;
    event.target.classList.remove('text-secondary');
    event.target.classList.add('text-light');
    if (game_state > 4) {
        // when >4 plays have been made, check for win or tie (only for the player that just went)
        if (check_game(current_player)) {
            message_board.textContent = `PLAYER ${current_player} WINS!!`;
            // lock the remaining buttons
            for (let i = 0; i < board_state.length; i++) {
                if (board_state[i] === '') {
                    document.getElementById(i).removeEventListener('click', tile_click);
                }
            }
            // show reset button
            reset_button.classList.remove('d-none');
            return;
            // report on a draw if it gets that far
        } else if (game_state === 9) {
            message_board.textContent = 'IT\'S A DRAW';
            // show reset button
            reset_button.classList.remove('d-none');
            return;
        }
    }
    // toggle current player
    current_player = ((current_player) === 'X' ? 'O' : 'X');
    // update message board message
    message_board.textContent = `your turn, player ${current_player}!`;
    // remove event listener from clicked tile
    event.target.removeEventListener('click', tile_click);
}

init();