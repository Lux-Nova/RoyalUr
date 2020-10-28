let canvas = document.querySelector("#myCanvas");
let context = canvas.getContext('2d');
context.font = "40pt Calibri"
context.fillStyle = "blue"

const model = {
  board :   [
            ['_','1','_','_','_','_','_','_'],
            ['_','_','_','_','_','_','_','_'],
            ['A','B','C','D','_','_','_','_']
            ],
  next: 'A'
}

function render(){
  for(let row=0; row<3; row++){
    context.fillText(model.board[row].join('|'), 20, 40+row * 50);
    if(row<2){
      context.fillText("-----------------", 20, 60 + row * 50);
    }
  }
}

var roll_count = 0;
function roll_dice(){
  for(let i=0; i<4; i++){
    roll_count = roll_count + Math.floor(Math.random()*2);
  }
  document.getElementById("roll_output").innerHTML = roll_count;
  roll_count = 0;
}

function clear_roll(){
  roll_count = 0;
  document.getElementById("roll_output").innerHTML = roll_count;
}
