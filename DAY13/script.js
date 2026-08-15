let move_speed = 3, grativity = 0.5;
let bird = document.querySelector('.bird');
let img = document.getElementById('.bird-1');

let bird_props = bird.getBoundingClientRect();

let background = document.querySelector('.background').getBoundingClientRect();
let scor_val = document.querySelector('.score_val');
let message = document.querySelector('.message');
let score_title = document.querySelector('.score_title');

let game_state = 'start';
img.style.display = 'none';
message.classList.add('messageStyle');

