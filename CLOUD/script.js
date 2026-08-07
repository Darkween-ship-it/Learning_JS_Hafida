
function randomText(){
    let text="HAFIDADJOT";
    var letters = text[Math.floor(Math.random() * text.length)];
    return letters;
}

function rain(){
    let cloud = document.querySelector('.cloud');
    let e =document.createElement('div');

    e.classList.add('drop');
    cloud.appendChild(e);

    let left = Math.floor(Math.random() * 300);
    let size = Math.random() * 1.5;
    let duration = Math.random() * 1 + 0.5;

    e.innerText = randomText();
    e.style.left = left + 'px';
    e.style.fontSize = 0.5 + size +'em';
    e.style.animationDuration = duration + 's';

    //Remove th drop after animation fiinishes//

    setTimeout(() =>{
        cloud.removeChild(e);
    },duration*1000);
}

//generate continuos rain drops//

setInterval(() =>{
    rain();
},20);