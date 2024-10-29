let  allMusicHome = [
    {
        name: "Khuất lối",
        artist: "--H Kray--",
        img: "./image/song1.jpg",
        src: "./music/song1.mp3",
        idMusic: "song1"
    },
    {
        name: "Sao Cũng Được",
        artist: "--Thành Đạt--",
        img: "./image/song2.jpg",
        src: "./music/song2.mp3",
        idMusic: "song2"
    },
    {
        name: "Cuối Cùng Thì",
        artist: "--Jack--",
        img: "./image/song3.jpg",
        src: "./music/song3.mp3",
        idMusic: "song3"
    },
    {
        name: "Tiếng Pháo Tiễn Người",
        artist: "--Hùng Quân--",
        img: "./image/song4.jpg",
        src: "./music/song4.mp3",
        idMusic: "song4"
    },
    
    {
        name: "Chắc Vì Mình Chưa Tốt",
        artist: "--Thanh Hưng--",
        img: "./image/song8.jpg",
        src: "./music/song8.mp3",
        idMusic: "song8"
    }

]
var fa_bars = document.querySelector(".fa-bars");
var listMenu = document.querySelector(".listMenu");
var navbars = document.querySelector(".navbars"),
    titleFotterSpan = document.querySelector(".titleFotter span"),
    titleFotterP = document.querySelector(".titleFotter p"),
    imgFotter = document.querySelector(".imgFotter img"),
    songFotter = document.querySelector(".songFotter"),
    play = document.querySelector("#play"),
    next = document.getElementById("next"),
    progressbar = document.querySelector(".progress_bar"),
    progress = document.querySelector('.progress'),
    prev = document.getElementById("prev");
var platList_item = document.querySelector(".platList_item ul");
navbars.addEventListener('click', function(){
    if(this.querySelector("i").classList.contains("fa-bars")){
        listMenu.style.display = "block";
        fa_bars.classList.replace("fa-bars", "fa-arrow-left-long");
    }
    else{
        listMenu.style.display = "none";
        fa_bars.classList.replace("fa-arrow-left-long", "fa-bars");
    }
})

allMusicHome.forEach((itemMusic, index)=>{
    let liMusic = `
            <li musicindex="${index+1}" class="playlist_item_single col-6">
                <div class="item_thumb">
                    <img src="${itemMusic.img}" alt="" >                        
                </div>
                <h3>${itemMusic.name}</h3>
                <div class="singer_song">
                    ${itemMusic.artist}
                </div>
            </li>
    `
    platList_item.insertAdjacentHTML("beforeend", liMusic);
})
let play_song = false;
let rotationDegree = 0;
var settimeout;
let musicIndex = 0;
let autoplay = 0;
window.addEventListener("load", ()=>{
    playLiMusic();
})
function loadMusic(index){
    autoplay_song();
    titleFotterSpan.innerHTML = allMusicHome[index].name;
    titleFotterP.innerText = allMusicHome[index].artist;
    imgFotter.src = `${allMusicHome[index].img}`;
    songFotter.src = allMusicHome[index].src;
    songFotter.load();
    range_slider()
}
loadMusic(musicIndex);

function rotateImage() {
    rotationDegree += 1;
    imgFotter.style.transform = `rotate(${rotationDegree}deg)`;
}
function musicPlay(){
    if (play_song == false) {
        playsong();
        settimeout = setInterval(rotateImage, 100);
    } else {
        pausesong();
        clearInterval(settimeout);
    }
}
function playsong(){
    songFotter.play();
    play_song = true;
    play.innerHTML = '<i class="fa-solid fa-pause"></i>';
}
function pausesong(){
    songFotter.pause();
    play_song = false;
    clearInterval(settimeout)
    play.innerHTML = '<i class="fa-solid fa-play"></i>';
}

function nextMusic(){
    if(musicIndex < allMusicHome.length -1){
        musicIndex++;
        loadMusic(musicIndex);
        playsong();
    }else{
        musicIndex = 0;
        loadMusic(musicIndex);
        playsong();
    }
}
// ---------prev Music----------
function prevMusic(){
    if(musicIndex > 0){
        musicIndex--;
        loadMusic(musicIndex);
        playsong();
    }else{
        musicIndex = allMusicHome.length -1;
        loadMusic(musicIndex);
        playsong();
    }
}
next.addEventListener("click", ()=> {
    clearInterval(settimeout);
    play_song = false;
    rotationDegree = 0;
    musicPlay()
    nextMusic();
})

prev.addEventListener("click", ()=> {
    clearInterval(settimeout);
    play_song = false;
    rotationDegree = 0
    musicPlay()
    prevMusic();
})
function autoplay_song(){
    if(autoplay==1){
        autoplay=0;
    }else{
        autoplay=1;
    }
}

function range_slider(){
    songFotter.addEventListener("ended", function(){
        play.innerHTML = `<i class="fa-solid fa-pause"></i>`;
        play_song = true;
        musicPlay();
    })
}
var allLiMusic = document.querySelectorAll(".list_Music li");
function playLiMusic(){
    for (let j = 0; j < allLiMusic.length; j++) {
        if(allLiMusic[j].classList.contains("playMusic")){
            allLiMusic[j].classList.remove("playMusic")
        }
        if(allLiMusic[j].getAttribute("musicindex") == musicIndex){
            allLiMusic[j].classList.add("playMusic");
        }
        allLiMusic[j].setAttribute("onclick", "clicked(this)");
    }
    
}
function clicked(index){
    let getLiIndex = index.getAttribute("musicindex");
    musicIndex = getLiIndex -1;
    loadMusic(musicIndex);
    playLiMusic();
    rotationDegree = 0
    play_song = false;
    clearInterval(settimeout);
    musicPlay()
}


songFotter.addEventListener("timeupdate", (e)=>{
    const currentTime = e.target.currentTime;
    const duration = e.target.duration;
    const time = document.querySelector(".time")
    let progressWidth = (currentTime/duration)*100;
    progressbar.style.width = `${progressWidth}%`;
    time.style.left = `${progressWidth-2}%`;

    let musicCurrentTime = document.querySelector(".current")
    let musicDuration = document.querySelector(".duration")
    songFotter.addEventListener("loadeddata", ()=>{
        let audioduration = songFotter.duration;
        let totalMusicmin = Math.floor(audioduration/60);
        let totalMusicsec = Math.floor(audioduration%60);
        
        if(totalMusicsec < 10){
            totalMusicsec = `0${totalMusicsec}`;
        }
    });
    let currentMusicmin = Math.floor(currentTime/60);
    let currentMusicsec = Math.floor(currentTime%60);
        if(currentMusicmin < 10){
            currentMusicmin = `0${currentMusicmin}`;
        }
        if(currentMusicsec < 10){
            currentMusicsec = `0${currentMusicsec}`;
        }
        musicCurrentTime.innerText = `${currentMusicmin}:${currentMusicsec}`;

});
progress.addEventListener("click", (e)=>{
    let progressWidthval = progress.clientWidth;
    let clickOffsetX = e.offsetX;
    let songDuration = songFotter.duration;
    songFotter.currentTime = (clickOffsetX / progressWidthval) * songDuration;
    playsong();
})