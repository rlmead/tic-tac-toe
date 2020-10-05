// connect to game board div
const board = document.getElementById('board');

// VIEW - render logic

// declare function to generate html elements
function generate_element(type, id, class_list, parent=false, event=false, event_listener_function=false) {
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
}


// create the parent row that will hold the grid squares
generate_element("row", "grid_parent_row", "row", board)

// declare class for grid squares
    // init: generate_element(div, id (number), col-4, grid_parent_row, click_event_listener)
    // will the states 

// MODEL - game logic

// track game_state
    // initialize to 0
    // count up with each turn
    // switch player according to whether game state is even or odd

// track board_state
    // array corresponding to grid tiles:
        // '' for empty
        // 'o' for player O
        // 'x' for player X
    // initialize to ['', '', '', '', '', '', '', '']
    // update with each click


// declare list of all possible winning grid square index combinations
// let wins = [
    // [0,1,2],
    // ...
    // ]

// declare function to check for win or tie
// function check_board(player)
    // check all arrays in wins to see if the given indexes in the board_state array match the given player

// CONTROLLER

// init (same as reset?)
    // set game logic to start
    // load empty board
    // add event listeners to board tiles
    // set next player

// tile click
    // update game state
    // update board_state
    // when game_state > 5, check win or tie (only for the player that just went)
        // when relevant: display winner/tie message, lock all tiles, show restart button 
    // update board & lock tile
