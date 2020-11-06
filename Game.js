let canvas = document.querySelector("#myCanvas");
let context = canvas.getContext('2d');
context.font = "40pt Calibri"
context.fillStyle = "blue"
var board_logic = new Board(12);
var piece_location = 0;
var roll_count;
var player_1_turn = true;
var blank_space = '_';



let model = {
  board :   [
            ['A','_','_','_','_','_','_','_'],
            ['_','B','_','_','_','_','_','_'],
            ['_','_','_','_','_','_','_','_']
            ],
}

function roll_dice(){
  roll_count = 0;
  for(let i=0; i<4; i++){
    roll_count = roll_count + Math.floor(Math.random()*2);
  }
  document.getElementById("roll_output").innerHTML = roll_count;
}


function move(){
  //find piece
  let piece_select = document.getElementById("piece_sel").value;
  let char_element = null;
  //generates char_element
  if(piece_select == 0){
    if(player_1_turn){char_element = 'A';}
    else{char_element = '1';}
  }
  else if(piece_select == 1){
    if(player_1_turn){char_element = 'B';}
    else{char_element = '2';}
  }
  else if(piece_select == 2){
    if(player_1_turn){char_element = 'C';}
    else{char_element = '3';}
  }
  else if(piece_select ==3){
    if(player_1_turn){char_element = 'D';}
    else{char_element = '4';}
  }
  else{
    document.getElementById("check_error").innerHTML = "Failed at 46!"+char_element;
    return;
  }
  //find char_element
  piece_index = this.board_logic.find_piece_start(char_element, player_1_turn);
  document.getElementById("check_error2").innerHTML = "Piece location is " + piece_location;
  if(piece_index === null){
    piece_location = 1;
    piece_index = this.board_logic.find_piece_board(char_element, player_1_turn);
    document.getElementById("check_error1").innerHTML = piece_index;
    if(piece_index === null){
      piece_location = 2;
      //send error
      document.getElementById("check_error2").innerHTML = "Failed at 65!";
      return;
    }
  }
  else{
    piece_location = 0;
  }
  //check move against roll
    //if move+index > board length, fail
    //if move > roll, fail
  let move_count = document.getElementById("move_sel").value;

  if(move_count>roll_count){
    document.getElementById("move_error").innerHTML = "Move is greater than roll!";
    return;
    if((move_count+piece_index)>this.board_logic.length){
      document.getElementById("move_error").innerHTML = "Move is not exact!";
      return;
    }
  }
  else{
    document.getElementById("move_error").innerHTML = "Move is okay!";
  }
  //check if move is possible
  document.getElementById("check_error1").innerHTML = piece_location;
  if(board_logic.check_board((piece_index+move_count), player_1_turn)){
    if(piece_location == 0){
      board_logic.remove_piece_start(piece_index, player_1_turn);
      board_logic.add_piece_board(char_element, piece_index+move_count, player_1_turn);
      document.getElementById("check_error4").innerHTML = "Piece was at start" + board_logic.get_piece_index(piece_index+move_count, player_1_turn);
    }
    else if(piece_location == 1){
      board_logic.remove_piece_board(piece_index, player_1_turn);
      if((move_count+piece_index)==board_logic.length){
        board_logic.add_piece_end(char-element, player_1_turn);
      }
      else{
        board_logic.add_piece_board(char_element, piece_index+move_count, player_1_turn);
      }
      document.getElementById("check_error4").innerHTML = "Piece was at board";
    }
    else{
      document.getElementById("check_error4").innerHTML = "Failed at 95!";
      return;
    }
  }
  else{
    document.getElementById("check_error3").innerHTML = board_logic.check_board((piece_index+move_count), player_1_turn).toString();
    document.getElementById("check_error").innerHTML = "Failed at 106!";
    return;
  }

  roll_count = roll_count - move_count;
  document.getElementById("roll_output").innerHTML = roll_count;
  this.update();
  //check winner of turn,
  if(this.check_winner()){
    let temp_player;
    if(player_1_turn){
      temp_player = "1";
    }
    else{
      temp_player = "2";
    }
    document.getElementById("win_output").innerHTML ="Player "+temp_player+" won!";
  }
  this.render();
}

function check_winner(){
  return (this.board_logic.check_end(player_1_turn));
}

function render(){
  context.clearRect(0,0,canvas.width, canvas.height);
  for(let row=0; row<3; row++){
    context.fillText(model.board[row].join('|'), 20, 40+row * 50);
    if(row<2){
      context.fillText("-----------------", 20, 60 + row * 50);
    }
  }
}

function update(){
  //refresh model
  //go through the model for loop
  //update each of the,
  for(let row=0; row<3; row++){
    //row 1
    for(let col=0; col<8; col++){
      switch (row){
        case 0:
          //0-3
          if(col>=0 && col<4){
            if(board_logic.get_piece_index((-1*(col-3)),player_1_turn) == null){
              model.board[row][col] = blank_space;
            }
            else{
              model.board[row][col] = board_logic.get_piece_index((-1*(col-3)),player_1_turn);
            }
          }
          //4-5 blank
          else if(col>=4 && col<6){
            model.board[row][col] = blank_space;
          }
          //6-7
          else{
            if(board_logic.get_piece_index((-1*(col-19)),player_1_turn)){
              model.board[row][col] = blank_space;
            }
            else{
              model.board[row][col] = board_logic.get_piece_index((-1*(col-19)),player_1_turn);
            }
          }
        case 1:
          if(board_logic.get_piece_index(col+4,player_1_turn) == null){
            model.board[row][col] = blank_space;
          }
          else{
            model.board[row][col] = board_logic.get_piece_index(col+4,player_1_turn);
          }
        case 2:
          //0-3
          if(col>=0 && col<4){
            if(board_logic.get_piece_index((-1*(col-3)),!player_1_turn) == null){
              model.board[row][col] = blank_space;
            }
            else{
              model.board[row][col] = board_logic.get_piece_index((-1*(col-3)),!player_1_turn);
            }
          }
          //4-5 blank
          else if(col>=4 && col<6){
            model.board[row][col] = blank_space;
          }
          //6-7
          else{
            if(board_logic.get_piece_index((-1*(col-19)),!player_1_turn) == null){
              model.board[row][col] = blank_space;
            }
            else{
              model.board[row][col] = board_logic.get_piece_index((-1*(col-19)),!player_1_turn);
            }
          }
      }
    }
  }
}

function clear_roll(){
  roll_count = 0;
  document.getElementById("roll_output").innerHTML = roll_count;
  document.getElementById("move_error").innerHTML = " ";
}
