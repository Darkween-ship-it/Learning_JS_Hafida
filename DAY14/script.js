let move_speed = 3, grativity = 0.5;
let bird = document.querySelector('.bird');
let img = document.getElementById('bird-1');

let bird_props = bird.getBoundingClientRect();

let background = document.querySelector('.background').getBoundingClientRect();
let score_val = document.querySelector('.score_val');
let message = document.querySelector('.message');
let score_title = document.querySelector('.score_title');

let game_state = 'start';
let bird_dy = 0;
img.style.display = 'none';
message.classList.add('messageStyle');

const MODEL_URL = './model/';
let recognizer;
let clap_idx = -1;
let last_flap_time = 0;

const debugBox = document.createElement('div');
debugBox.style.cssText = 'position:fixed;bottom:10px;left:10px;z-index:1000;background:rgba(0,0,0,0.7);color:#0f0;font:14px monospace;padding:8px;border-radius:4px;';
document.body.appendChild(debugBox);

async function initAudioModel(){
    try {
        recognizer = speechCommands.create(
            "BROWSER_FFT",
            undefined,
            MODEL_URL + "model.json",
            MODEL_URL + "metadata.json"
        );
        await recognizer.ensureModelLoaded();
        clap_idx = recognizer.wordLabels().indexOf('Clap');
        debugBox.textContent = 'model ready - press Enter';
        console.log('model loaded:', recognizer.wordLabels());
    } catch (err) {
        debugBox.textContent = 'model error - check console';
        console.log('model error:', err);
    }
}

function startListening(){
    if (!recognizer) return;
    recognizer.listen((result) => {
        let clap = result.scores[clap_idx];
        debugBox.textContent = 'Clap ' + clap.toFixed(2);
        if (clap > 0.8 && Date.now() - last_flap_time > 350) {
            console.log('clap!');
            flap();
            last_flap_time = Date.now();
        }
    }, {
        overlapFactor: 0.75,
        invokeCallbackOnNoiseAndUnknown: true,
        probabilityThreshold: 0
    });
}

initAudioModel();

function flap(){
    if(game_state != 'Play') return;
    bird_dy = -7.6;
    img.src = 'Bird-2.png';
    setTimeout(() => img.src = 'Bird.png', 200);
}

document.addEventListener('keydown',(e) =>{
    if(e.key == 'ArrowUp' || e.key == ' '){
        flap();
    }
});

document.addEventListener('keydown',(e) =>{
    if(e.key == 'Enter' && game_state != 'Play'){
        document.querySelectorAll('.pipe_sprite').forEach((e) => {
            e.remove();
        });
        img.style.display = 'block';
        bird.style.top = '40vh';
        game_state = 'Play';
        message.innerHTML = '';
        score_title.innerHTML = 'Score:';
        score_val.innerHTML = '0';
        message.classList.remove('messageStyle');
        startListening();
        play();
    }
});

function play(){
    function move(){
        if(game_state != 'Play') return;

        let pipe_sprite = document.querySelectorAll('.pipe_sprite');
        pipe_sprite.forEach((element) => {
            let pipe_sprite_props = element.getBoundingClientRect();
            bird_props = bird.getBoundingClientRect();

            if (pipe_sprite_props.right <= 0){
                element.remove();
            }else{
                if(bird_props.left < pipe_sprite_props.left + pipe_sprite_props.width && bird_props.left + bird_props.width > pipe_sprite_props.left && bird_props.top < pipe_sprite_props.top +pipe_sprite_props.height && bird_props.top +bird_props.height > pipe_sprite_props.top){
                    game_state='End';
                    message.innerHTML = 'Game Over'.fontcolor('red') + '<br>Press Enter To Restart';
                    message.classList.add('messageStyle');
                    img.style.display = 'none';
                    return;
                }else{
                    if(pipe_sprite_props.right < bird_props.left && pipe_sprite_props.right + move_speed >= bird_props.left && 
                    element.increase_score == '1'){
                        score_val.innerHTML =+ score_val.innerHTML + 1;
                    }
                    element.style.left = pipe_sprite_props.left - move_speed + 'px' ;
                }
            }
        });
        requestAnimationFrame(move);
    }
    requestAnimationFrame(move);

    function apply_gravity(){
        if(game_state != 'Play') return;
        bird_dy = bird_dy + grativity;


        if(bird_props.top <= 0 || bird_props.bottom >= background.bottom){
            game_state ='End';
            message.style.left = '28vw';
            window.location.reload();
            message.classList.remove('messageStyle');
            return;
        }
        bird.style.top = bird_props.top + bird_dy +'px';
        bird_props = bird.getBoundingClientRect();
        requestAnimationFrame(apply_gravity);
    }
    requestAnimationFrame(apply_gravity);

    let pipe_seperation = 0;
    let pipe_gap = 40;

    function create_pipe(){
        if(game_state != 'Play') return;

        if(pipe_seperation > 115){
            pipe_seperation = 0;
            let pipe_posi = Math.floor(Math.random() * 43) + 8;
            let pipe_sprite_inv = document.createElement('div');
            pipe_sprite_inv.className = 'pipe_sprite';
            pipe_sprite_inv.style.top = pipe_posi -70 +'vh';
            pipe_sprite_inv.style.left = '100vw';

            document.body.appendChild(pipe_sprite_inv);
            let pipe_sprite = document.createElement('div');
            pipe_sprite.className = 'pipe_sprite';
            pipe_sprite.style.top = pipe_posi +pipe_gap +'vh';
            pipe_sprite.style.left = '100vw';
            pipe_sprite.increase_score ='1';

            document.body.appendChild(pipe_sprite);
        }
        pipe_seperation++;
        requestAnimationFrame(create_pipe);
    }
    requestAnimationFrame(create_pipe);
}
