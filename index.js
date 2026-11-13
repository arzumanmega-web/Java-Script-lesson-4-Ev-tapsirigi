let images = ['1.jpg', '2.jpg', '3.jpg', '4.jpg','1.jpg', '2.jpg', '3.jpg', '4.jpg'];

let myimage = document.querySelector("#myimg");

let l = document.querySelector("#left");
let r = document.querySelector("#right");
let altSekil=document.querySelector("#altSekil");

let index = 1;
let min = 1;
let max = images.length;

function altSekils(){
    let altImg="";
    for(let i=0;i<images.length;i++){
        altImg+=`<div><img src="images/${images[i]}"></div>`;
    }
    altSekil.innerHTML=altImg;
    const imgS=altSekil.children;
    for(let i=0;i<imgS.length;i++){
        imgS[i].style="hover {filter: blur(20px);}"
    }
}
altSekils();

function left() {
    if (index > min) {
        index--;
    }

    if (index == min) {
        l.style.display = "none";
    }
    else {
        l.style.display = "inline-block";
    }

    if (index < max) {
        r.style.display = "inline-block";
    }

    myimage.src = `images/${images[index - 1]}`;

}



function right() {
    if (index < max) {
        index++;
    }

    if (index == max) {
        r.style.display = "none";
    }
    else {
        r.style.display = "inline-block";
    }

    if (index > min) {
        l.style.display = "inline-block";
    }

    myimage.src = `images/${images[index - 1]}`;
}

let hasAdded = false;




var clear;
function MouseMove() {
    clearTimeout(clear);
}

function MouseOut() {
    Slide();
}