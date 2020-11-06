class Board{
  //board = [space]
  //start 1 = [char] pieces
  //start 2 = [char] pieces
  //end 1 = [char] pieces
  //end 2 = [char] pieces
  constructor(length){
    this.board = [];
    for(let i=0; i<length; i++){
      if(i>=0 && i<=4){
        this.board[i] = new Space(true, [], [], false, false);
      }
      else if(i>=5 && i<12){
        this.board[i] = new Space(false, [], [], false, false);
      }
      else{
        this.board[i] = new Space(true, [], [], false, false);
      }
    }
    this.start_player_1 = ['A','B','C','D'];
    this.start_player_2 = ['1','2','3','4'];
    this.end_player_1 = [];
    this.end_player_2 = [];
  }

  check_board(index, player1){
    let temp = 0;
    for(let cell of this.board){
      if(player1){
        if(temp == index){
          return(!cell.get_player(player1) /*&& (cell.get_player(!player1) || !cell.is_safe())*/);
        }
      }
      else{
        if(temp == index){
          return(!cell.get_player(!player1) /*&& (cell.is_empty(player1) || !cell.is_safe())*/);
        }
      }
      temp++;
    }
  }

  get_piece_index(index, player1){
    let temp = 0;
    for(let cell of this.board){
      if(temp == index){
        if(player1){
          return(cell.get_piece(player1));
        }
        else{
          return(cell.get_piece(!player1));
        }
      }
      temp++;
    }
  }

  add_piece_board(piece, index, player1){
    let temp = 0;
    for(let cell of this.board){
      if(temp == index){
        if(cell.is_empty(player1)){
          if(cell.is_empty(!player1)){
            cell.add_piece(piece, player1);
            return;
          }
          else{
            if(cell.is_safe()){
              return;
            }
            else{
              cell.remove_piece(!player1);
              cell.add_piece(piece, player1);
              return;
            }
          }
        }
      }
      temp++;
    }
  }

  remove_piece_board(index, player1){
    let temp = 0;
    for(let cell of this.board){
      if(temp == index){
        if(player1){
          this.board[index].remove_piece(player1);
        }
        else{
          this.board[index].remove_piece(player1);
        }
      }
      temp++;
    }
  }

  add_piece_end(piece, player1){
    if(player1){
      this.end_player_1.push(piece);
    }
    else{
      this.end_player_2.push(piece);
    }
  }

  remove_piece_start(index, player1){
    if(player1){
      this.start_player_1.splice(index, 1);
    }
    else{
      this.start_player_2.splice(index, 1);
    }
  }

  check_end(player1){
    if(player1){
      return(this.end_player_1.length == 4);
    }
    else{
      return(this.end_player_2.length == 4);
    }
  }

  find_piece_start(piece, player1){
    if(player1){
      for(let i=0; i<this.start_player_1.length; i++){
        if(piece == this.start_player_1[i]){
          return(i);
        }
      }
    }
    else{
      for(let j=0; j<this.start_player_2.length; j++){
        if(piece == this.start_player_2[j]){
          return(j);
        }
      }
    }
    return(null);
  }

  find_piece_board(piece, player1){
    for(let i=0; i<this.board.length; i++){
      if(player1){
        if(piece == this.board[i].piece_1){
          return(i);
        }
      }
      else{
        if(piece == this.board[i].piece_2){
          return(i);
        }
      }
    }
    return(null);
  }
}
