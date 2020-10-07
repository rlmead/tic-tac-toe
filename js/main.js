// connect to game board div
const board = document.getElementById('board');

// VIEW - render logic

// declare function to generate html elements
function generate_element(type, id, class_list, parent = false, event = false, event_listener_function = false) {
    let new_element = document.createElement(type);
    new_element.id = id;
    new_element.setAttribute('class', class_list);
    if (event) {
        // hmmmm does this need to be 2 variables?
        new_element.addEventListener(event, event_listener_function);
    }
    if (parent) {
        parent.appendChild(new_element);
    }
    return new_element;
}

// MODEL - game logic
let game_state, board_state, current_player, winning_combos;

// function to initialize game logic
function start_game() {
    // track current state of game by counting up number of turns
    game_state = 0;
    // track current state of board to check for wins
    board_state = ['', '', '', '', '', '', '', '', ''];
    current_player = 'x';
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
    for (c of winning_combos) {
        if (c.map((item) => board_state[item]).join('') === player.repeat(3)) {
            return true;
        }
    }
}

// CONTROLLER

// initialize the game (same as reset?)
function init() {
    // load empty board
    board.innerHTML = '';
    // create the row that will hold the grid squares
    let grid_parent_row = generate_element('div', 'grid_parent_row', 'row w-50 bg-dark mx-auto mt-3', board);
    // create the grid squares
    for (let i = 0; i < 9; i++) {
        // to do: add event listeners to board tiles to trigger tile click function!
        let new_grid_square = generate_element('div', i, 'col-4 border text-light', grid_parent_row);
        new_grid_square.setAttribute('style', 'height: calc(4em)');
        let new_paragraph = generate_element('p', 'para_' + i, '', new_grid_square);
        // set game logic to start
        start_game();
        // set next player
    }
}

// update everything when a player plays
function tile_click(tile_id) {
    // move the game forward when there hasn't yet been a win
    if (game_state < 9 || (game_state < 5 && !check_game(current_player))) {
        // update game state
        game_state += 1;
        // update board_state and board
        board_state[tile_id] = current_player;
        document.getElementById(tile_id).textContent = current_player;
        // remove event listener from clicked tile
        // toggle current player
        current_player = ((current_player) === 'x' ? 'o' : 'x');
    } else {
        if (check_game(current_player)) {
            // when >4 and <9 plays have been made, check for win or tie (only for the player that just went)
            console.log(`YAY ${current_player} WINS!!!`);
        } else if (game_state === 9) {
            // report on a tie if it gets that far
            console.log('It\'s a tie!');
        }
        // create a popup with a message dictated by the previous lines
        // when relevant: lock all tiles, show restart button
    }
}

    init();

    check_game('o');