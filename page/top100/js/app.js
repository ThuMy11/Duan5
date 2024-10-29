let  allMusic1 = [
    {
        name: "Khuất lối",
        artist: "--H Kray--",
        img: "../../../image/song1.jpg",
        src: "../../../music/song1.mp3",
        idMusic: "song1"
    },
    {
        name: "Sao Cũng Được",
        artist: "--Thành Đạt--",
        img: "../../../image/song2.jpg",
        src: "../../../music/song2.mp3",
        idMusic: "song2"
    },
    {
        name: "Cuối Cùng Thì",
        artist: "--Jack--",
        img: "../../../image/song3.jpg",
        src: "../../../music/song3.mp3",
        idMusic: "song3"
    },
    {
        name: "Tiếng Pháo Tiễn Người",
        artist: "--Hùng Quân--",
        img: "../../../image/song4.jpg",
        src: "../../../music/song4.mp3",
        idMusic: "song4"
    },
    {
        name: "Thay Tôi Yêu Cô Ấy",
        artist: "--Thanh Hưng--",
        img: "../../../image/song5.jpg",
        src: "../../../music/song5.mp3",
        idMusic: "song5"
    },
    {
        name: "Yêu Khác Thương Hại",
        artist: "--Thanh Hưng--",
        img: "../../../image/song6.jpg",
        src: "../../../music/song6.mp3",
        idMusic: "song6"
    },
    {
        name: "Ai Đợi Mình Được Mãi",
        artist: "--Thanh Hưng--",
        img: "../../../image/song7.jpg",
        src: "../../../music/song7.mp3",
        idMusic: "song7"
    },
    {
        name: "Cuối Cùng Thì",
        artist: "--Jack--",
        img: "../../../image/song3.jpg",
        src: "../../../music/song3.mp3",
        idMusic: "song3"
    },
    {
        name: "Tiếng Pháo Tiễn Người",
        artist: "--Hùng Quân--",
        img: "../../../image/song4.jpg",
        src: "../../../music/song4.mp3",
        idMusic: "song4"
    },
    {
        name: "Thay Tôi Yêu Cô Ấy",
        artist: "--Thanh Hưng--",
        img: "../../../image/song5.jpg",
        src: "../../../music/song5.mp3",
        idMusic: "song5"
    },
    {
        name: "Yêu Khác Thương Hại",
        artist: "--Thanh Hưng--",
        img: "../../../image/song6.jpg",
        src: "../../../music/song6.mp3",
        idMusic: "song6"
    },
    {
        name: "Ai Đợi Mình Được Mãi",
        artist: "--Thanh Hưng--",
        img: "../../../image/song7.jpg",
        src: "../../../music/song7.mp3",
        idMusic: "song7"
    },
    {
        name: "Chắc Vì Mình Chưa Tốt",
        artist: "--Thanh Hưng--",
        img: "../../../image/song8.jpg",
        src: "../../../music/song8.mp3",
        idMusic: "song8"
    }

]
var fa_bars = document.querySelector(".fa-bars");
var listMenu = document.querySelector(".listMenu");
var navbars = document.querySelector(".navbars");
var list = document.querySelectorAll(".list li"),
    listMusic1 = document.querySelector(".listMusic1"),
    titleFotterSpan = document.querySelector(".titleFotter span"),
    titleFotterP = document.querySelector(".titleFotter p"),
    imgFotter = document.querySelector(".imgFotter img"),
    songFotter = document.querySelector(".songFotter"),
    play = document.querySelector("#play"),
    next = document.getElementById("next"),
    prev = document.getElementById("prev"),
    progressbar = document.querySelector(".progress_bar"),
    progress = document.querySelector('.progress');
let play_song = false;
window.addEventListener("load", ()=>{
    loadMusic(musicIndex);
    playLiMusic();
})

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

list.forEach((item)=>{
    item.addEventListener("click", function(){
        list.forEach(function (li) {
            li.classList.remove('active');
        });

        this.classList.add("active")
    })
})
allMusic1.forEach((itemMusic, index)=>{
    let liMusic = `
    <li musicindex="${index+1}" class="col-12">
                <div class="boxItemMusic paddingLeftRight paddingTopBottom d-flex col-12">
                    <div class="stt col-1">${index+1}</div>
                    <div class="col-11 d-flex paddingLeftRight" style="align-items: center;height: 100%">
                        <div class="image col-3">
                            <img src="${itemMusic.img}" alt="">
                        </div>
                        <div class="song-title col-9">
                            <span>${itemMusic.name}</span>
                            <p>${itemMusic.artist}</p>
                        </div>
                        <audio class="song1" src="./music/song1.mp3"></audio>
                    </div>
                </div>
            </li>
    `
    listMusic1.insertAdjacentHTML("beforeend", liMusic);
})
let rotationDegree = 0;
var settimeout;
let musicIndex = 0;
let autoplay = 0;

function loadMusic(index){
    autoplay_song();
    titleFotterSpan.innerHTML = allMusic1[index].name;
    titleFotterP.innerText = allMusic1[index].artist;
    imgFotter.src = `${allMusic1[index].img}`;
    songFotter.src = allMusic1[index].src;
    songFotter.load();
}
loadMusic(musicIndex);
range_slider();


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
    songFotter.addEventListener("canplay", function(){
        songFotter.play();
    })
    if (songFotter.readyState === 4) {
        // Âm thanh đã sẵn sàng, có thể phát
        songFotter.play();
      } 
    play_song = true;
    play.innerHTML = '<i class="fa-solid fa-pause"></i>';
}
function pausesong(){
    songFotter.pause();
    play_song = false;
    play.innerHTML = '<i class="fa-solid fa-play"></i>';
}


// ---------next Music----------
function nextMusic(){
    if(musicIndex < allMusic1.length -1){
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
        musicIndex = allMusic1.length -1;
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
    rotationDegree = 0;
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
        play.innerHTML = `<i class="fa-solid fa-play"></i>`;
        if(autoplay==0){
            clearInterval(settimeout);
            play_song = false;
            rotationDegree = 0;
            musicPlay();
            nextMusic();
            loadMusic(musicIndex);
            playsong();
        }
    })
}

var allLiMusic = document.querySelectorAll(".listMusic1 li");
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
    songFotter.currentTime = (clickOffsetX / progressWidthval) * songDuration
    playsong();
})