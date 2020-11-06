class Space {
  /*
  safe_space = bool, checks if space is safe to a side
  piece_1 = char, pieces of player 1
  piece_2 = char, pieces of player 2
  is_player_1 = bool, is there player 1 piece
  is_player_2 = bool, is there player 2 piece
  */
  constructor(space, piece_1, piece_2, player_1, player_2){
    this.safe_space = space;
    this.piece_1 = piece_1;
    this.piece_2 = piece_2;
    this.is_player_1 = player_1;
    this.is_player_2 = player_2;
  }

  is_empty(player1){
    if(player1){
      return(!this.is_player_1);
    }
    else{
      return(!this.is_player_2);
    }
  }

  get_player(player1){
    if(player1){
      return(this.is_player_1);
    }
    else{
      return(this.is_player_2);
    }
  }

  is_safe(){
    return(this.safe_space);
  }

  get_piece(player1){
    if(player1){
      return(this.piece_1);
    }
    else{
      return(this.piece_2);
    }
  }

  remove_piece(player1){
    if(player1){
      this.piece_1 = null;
      this.is_player_1 = false;
    }
    else{
      this.piece_2 = null;
      this.is_player_2 = false;
    }
  }

  add_piece(piece, player1){
    if(player1){
      if(this.is_empty(player1)){
        this.is_player_1 = true;
        this.piece_1 = piece;
      }
    }
    else{
      if(this.is_empty(!player1)){
        this.is_player_2 = true;
        this.piece_2 = piece;
      }
    }
  }
}
