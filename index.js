let sekiller = ['mersi1.jpg', 'mersi2.jpg', 'mersi3.jpg', 'mersi4.jpg', 'mersi5.jpg', 'mersi6.jpg', 'mersi7.jpg', 'mersi8.jpg', 'mersi9.jpg', 'mersi10.jpg', 'mersi11.jpg', 'mersi12.jpg', 'mersi13.jpg'];

let esasSekil = document.querySelector("#myimg");
let altSekillerDiv = document.querySelector("#altSekil");
let sliderPencere = document.querySelector(".slider-win");

let index = 1;
let min = 1;
let max = sekiller.length;

function altSekilleriHazirla() {

    let genisDonenSekiller = [sekiller[sekiller.length - 1], ...sekiller, sekiller[0]];

    let imgHtml = "";
    for (let i = 0; i < genisDonenSekiller.length; i++) {
        imgHtml += `<div><img src="images/${genisDonenSekiller[i]}"></div>`;
    }
    esasSekil.innerHTML = imgHtml;


    let genislik = sliderPencere.offsetWidth;
    esasSekil.style.transition = "none";
    esasSekil.style.transform = `translateX(-${genislik}px)`;


    let altImgHtml = "";
    for (let i = 0; i < sekiller.length; i++) {
        let filterStili = (i === 0) ? "contrast(1.1)" : "contrast(0.6)";
        altImgHtml += `<div style="filter: ${filterStili}; cursor: pointer;"><img src="images/${sekiller[i]}"></div>`;
    }
    altSekillerDiv.innerHTML = altImgHtml;

    const altElementler = altSekillerDiv.children;
    for (let i = 0; i < altElementler.length; i++) {
        altElementler[i].addEventListener("mouseenter", () => {
            index = i + 1;
            slaydGuncelle();
        });
    }
}
altSekilleriHazirla();

function slaydGuncelle() {
    esasSekil.style.transition = "transform 0.4s ease";
    let genislik = sliderPencere.offsetWidth;
    let hareketX = -index * genislik;
    esasSekil.style.transform = `translateX(${hareketX}px)`;


    let esasIndex = index - 1;
    if (index > max) esasIndex = 0;
    if (index < min) esasIndex = max - 1;

    const altElementler = altSekillerDiv.children;
    for (let k = 0; k < altElementler.length; k++) {
        if (k === esasIndex) {
            altElementler[k].style.filter = "contrast(1.1)";
        } else {
            altElementler[k].style.filter = "contrast(0.6)";
        }
    }
}


esasSekil.addEventListener("transitionend", () => {
    let genislik = sliderPencere.offsetWidth;
    if (index > max) {
        esasSekil.style.transition = "none";
        index = min;
        esasSekil.style.transform = `translateX(-${index * genislik}px)`;
    } else if (index < min) {
        esasSekil.style.transition = "none";
        index = max;
        esasSekil.style.transform = `translateX(-${index * genislik}px)`;
    }
});

function left() {
    index--;
    slaydGuncelle();
}

function right() {
    index++;
    slaydGuncelle();
}


let surusdurulur = false;
let baslangicX = 0;
let ferqX = 0;

sliderPencere.addEventListener("pointerdown", (e) => {
    surusdurulur = true;
    baslangicX = e.clientX;
    esasSekil.style.transition = "none";
    sliderPencere.setPointerCapture(e.pointerId);
});

sliderPencere.addEventListener("pointermove", (e) => {
    if (!surusdurulur) return;
    let cariX = e.clientX;
    ferqX = cariX - baslangicX;

    let genislik = sliderPencere.offsetWidth;
    let esasYer = -index * genislik;
    esasSekil.style.transform = `translateX(${esasYer + ferqX}px)`;
});

sliderPencere.addEventListener("pointerup", (e) => {
    if (!surusdurulur) return;
    surusdurulur = false;
    sliderPencere.releasePointerCapture(e.pointerId);

    let hessasliq = 70;

    if (ferqX < -hessasliq) {
        right();
    } else if (ferqX > hessasliq) {
        left();
    } else {
        slaydGuncelle();
    }

    ferqX = 0;
});