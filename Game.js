let canvas = document.querySelector("#myCanvas");
let context = canvas.getContext('2d');
context.font = "40pt Calibri"
context.fillStyle = "blue"
const LENGTH = 14;
var board_logic = new Board(LENGTH);
var piece_location = 0;
var roll_count;
var player_1_turn = true;
var blank_space = '_';
var null_space = 'X';
var moved_piece = [false, false, false, false];

let model = {
  board :   [
              ['_','_','_','_','X','X','_','_'],
              ['_','_','_','_','_','_','_','_'],
              ['_','_','_','_','X','X','_','_']
            ],
  player1:  ['A','B','C','D',],
  player2:  ['1','2','3','4',],
}

function move(){
  let piece_select = document.getElementById("piece_sel").value;
  let char_element = null;
  char_element = this.get_temp_char(piece_select);
  let piece_index = this.set_piece_location(char_element);
  let move_count = Number(document.getElementById("move_sel").value);
  if(moved_piece[piece_select]){
    document.getElementById("move_error").innerHTML = "Can't move piece twice.";
    return;
  }
  else{
    moved_piece[piece_select] = true;
  }
  if(move_count>roll_count){
    document.getElementById("move_error").innerHTML = "Move is greater than roll!";
    return;
    if((move_count+piece_index)>this.board_logic.length){
      document.getElementById("move_error").innerHTML = "Move is not exact!";
      return;
    }
  }
  if(piece_location == 0){
    if(board_logic.check_board(move_count-1, player_1_turn)){
      board_logic.remove_piece_start(piece_index, player_1_turn);
      board_logic.add_piece_board(char_element, move_count-1, player_1_turn);
    }
    else{
      return;
    }
  }
  else if(piece_location == 1){
    if(this.board_logic.check_board(((piece_index)+(move_count)), player_1_turn) || (move_count+piece_index)== 14){
      this.board_logic.remove_piece_board(piece_index, player_1_turn);
      if((move_count+piece_index)==LENGTH){
        this.board_logic.add_piece_end(char_element, player_1_turn);
      }
      else{
        this.board_logic.add_piece_board(char_element, ((piece_index)+(move_count)), player_1_turn);
      }
    }
    else{
      return;
    }
  }
  else{
    return;
  }
  this.update();
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
  roll_count = roll_count - move_count;
  if(roll_count == 0){
    this.switch_player();
  }
  this.render();
}

function get_temp_char(select){
  if(select == 0){
    if(player_1_turn){
      return('A');
    }
    else{
      return('1');
    }
  }
  else if(select == 1){
    if(player_1_turn){
      return('B');
    }
    else{
      return('2');
    }
  }
  else if(select == 2){
    if(player_1_turn){
      return('C');
    }
    else{
      return('3');
    }
  }
  else if(select == 3){
    if(player_1_turn){
      return('D');
    }
    else{
      return('4');
    }
  }
  else{
    document.getElementById("check_error").innerHTML = "Failed at 46!"+char_element;
    return(null);
  }
}

function switch_player(){
  moved_piece = [false, false, false, false];
  player_1_turn = !player_1_turn;
  let temp;
  if(player_1_turn){
    temp = '1';
  }
  else{
    temp = '2';
  }
  document.getElementById("player_turn").innerHTML = "It's Player " + temp + " turn.";
}

function set_piece_location(charSearch){
  let pieceIndex = null;
  pieceIndex = this.board_logic.find_piece_start(charSearch, player_1_turn);
  if(pieceIndex === null){
    piece_location = 1;
    pieceIndex = this.board_logic.find_piece_board(charSearch, player_1_turn);
    if(pieceIndex === null){
      piece_location = 2;
      return(pieceIndex);
    }
  }
  else{
    piece_location = 0;
  }
  return(pieceIndex);
}

function check_winner(){
  return (this.board_logic.check_end(player_1_turn));
}

function render(){
  context.clearRect(0,0,canvas.width, canvas.height);
  for(let row=0; row<3; row++){
    context.fillText(model.board[row].join('|'), 20, 40+row * 50);
  }
  context.fillText(model.player1.join('|'), 500, 40);
  context.fillText(model.player2.join('|'), 500, 140);

  document.getElementById("roll_output").innerHTML = "Roll is: " + roll_count;
  let temp;
  if(player_1_turn){
    temp = '1';
  }
  else{
    temp = '2';
  }
  document.getElementById("player_turn").innerHTML = "It's Player " + temp + " turn.";
  document.getElementById("move_error").innerHTML = "";
  document.getElementById("win_output").innerHTML = "";
  document.getElementById("check_error").innerHTML = "";
}

function update(){
  //refresh model
  //go through the model for loop
  //update each of the,
  let play1 = true;
  for(let row=0; row<3; row++){
    //row 1
    for(let col=0; col<8; col++){
      if(row == 0){
        //0-3
        if(col>=0 && col<4){
          if(board_logic.get_piece_index((-1*(col-3)),play1) == null){
            model.board[row][col] = blank_space;
          }
          else{
            model.board[row][col] = board_logic.get_piece_index((-1*(col-3)),play1);
          }
        }
        //4-5 blank
        else if(col>=4 && col<6){
          model.board[row][col] = null_space;
        }
        //6-7
        else{
          if(board_logic.get_piece_index((-1*(col-19)),play1) == null){
            model.board[row][col] = blank_space;
          }
          else{
            model.board[row][col] = board_logic.get_piece_index((-1*(col-19)),play1);
          }
        }
      }
      else if(row == 1){
        if(board_logic.get_piece_index(col+4, play1) == null && board_logic.get_piece_index(col+4, !play1) == null){
          model.board[row][col] = blank_space;
        }
        else if(board_logic.get_piece_index(col+4, play1) != null && board_logic.get_piece_index(col+4, !play1) == null){
          model.board[row][col] = board_logic.get_piece_index(col+4,play1);
        }
        else if(board_logic.get_piece_index(col+4, play1) == null && board_logic.get_piece_index(col+4, !play1) != null){
          model.board[row][col] = board_logic.get_piece_index(col+4,!play1);
        }
        else{
          model.board[row][col] = blank_space;
        }
      }
      else if(row == 2){
        //0-3
        if(col>=0 && col<4){
          if(board_logic.get_piece_index((-1*(col-3)),!play1) == null){
            model.board[row][col] = blank_space;
          }
          else{
            model.board[row][col] = board_logic.get_piece_index((-1*(col-3)),!play1);
          }
        }
        //4-5 blank
        else if(col>=4 && col<6){
          model.board[row][col] = null_space;
        }
        //6-7
        else{
          if(board_logic.get_piece_index((-1*(col-19)),!play1) == null){
            model.board[row][col] = blank_space;
          }
          else{
            model.board[row][col] = board_logic.get_piece_index((-1*(col-19)),!play1);
          }
        }
      }
    }
  }
  for(let i=0; i<4; i++){
    model.player1[i] = board_logic.get_start_board(i, play1);
    model.player2[i] = board_logic.get_start_board(i, !play1);
  }
}

function roll_dice(){
  roll_count = 0;
  for(let i=0; i<4; i++){
    roll_count = roll_count + Math.floor(Math.random()*2);
  }
  if(roll_count == 0){
    this.switch_player();
  }
  this.render();
}

function clear_roll(){
  roll_count = 0;
  document.getElementById("roll_output").innerHTML = "Roll is: " + roll_count;
  this.switch_player();
}
