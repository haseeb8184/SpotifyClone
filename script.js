console.log("Welcome to Spotify");

// Initialize
let songIndex = 0;
let audioElement = new Audio();
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));

let songs = [
    { songName: "Cheque", filePath: "Shubh - Cheques (Official Music Video) (1).mp4", coverPath: "cheque.jpg" },
    { songName: "With You", filePath: "With You - AP Dhillon (Official Music Video).mp4", coverPath: "with you.jpg" },
    { songName: "Still Rollin", filePath: "Shubh - Still Rollin (Official Music Video).mp4", coverPath: "still rollin.jpg" },
    { songName: "ShowStopper", filePath: "Showstopper _ JERRY (Official Music Video).mp4", coverPath: "showstopper.jpg" },
    { songName: "Elevated", filePath: "Shubh - Elevated (Official Music Video).mp4", coverPath: "elevated.jpg" },
    { songName: "IDGAF", filePath: "IDGAF (Full Video) Sidhu Moose Wala _ Morrisson _ Steel Banglez _ TheKidd _ SukhSanghera _ Moosetape.mp4", coverPath: "idgaf.jpg" },
    { songName: "Malang Sajna", filePath: "Malang Sajna (Video) Sachet-Parampara _ Adil Shaikh, Kumaar _ Bhushan Kumar (1).mp4", coverPath: "Malang-Sajna.jpg" },
    { songName: "Mi Amor", filePath: "Mi Amor ( Slowed + Reverb) SHARN _ 40K _ THE PAUL _ Lyricszoid.mp4", coverPath: "mi amor.jpg" },
    { songName: "12 Saal", filePath: "12 SAAL - BILAL SAEED - OFFICIAL VIDEO HD.mp4", coverPath: "12-Saal-Baarah-Saal-English-2011-500x500.jpg" },
    { songName: "Heeriye", filePath: "Heeriye (Official Video) Jasleen Royal ft Arijit Singh_ Dulquer Salmaan_ Aditya Sharma _Taani Tanvir.mp4", coverPath: "crop_480x480_7433011.jpg" },
];

songItems.forEach((element, i) => {
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
});

// Handle pause/play
masterPlay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;
    } else {
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity = 0;
    }
});

// Listen to Events
audioElement.addEventListener('timeupdate', () => {
    // Update Seekbar
    let progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
    myProgressBar.value = progress;
});

myProgressBar.addEventListener('change', () => {
    audioElement.currentTime = myProgressBar.value * audioElement.duration / 100;
});

const makeAllPlays = () => {
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    });
};

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element, index) => {
    element.addEventListener('click', () => {
        makeAllPlays();
        masterSongName.innerText = songs[index].songName;
        songIndex = index; // Update the current song index
        element.classList.remove('fa-play-circle');
        element.classList.add('fa-pause-circle');
        audioElement.src = songs[songIndex].filePath;
        audioElement.currentTime = 0;
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
    });
});

document.getElementById('next').addEventListener('click', () => {
    if(songIndex>=9){
        songIndex = 0
    }
    else{
        songIndex += 1;
    }
    // songIndex = (songIndex + 1) % songs.length; // Loop to the beginning if at the end
    audioElement.src = songs[songIndex].filePath;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
});

document.getElementById('previous').addEventListener('click', () => {
    if(songIndex<=0){
        songIndex = 0
    }
    else{
        songIndex -= 1;
    }
   //  songIndex = (songIndex - 1 + songs.length) % songs.length; // Loop to the end if at the beginning
    audioElement.src = songs[songIndex].filePath;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
});
