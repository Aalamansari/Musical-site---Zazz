console.log("Welcome to Zazz");

//Initializing the song variables
let songIndex = 0;
let audioElement = new Audio('songs/1.mp3');
let masterplay = document.getElementById('masterplay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));

let songs= [   
    {songName: "Satisfya-Imran Khan" ,               filePath: "songs/1.mp3", coverPath: "covers/satisfyacover.jpg"},
    {songName: "Amplifier-Imran Khan" ,              filePath: "songs/2.mp3", coverPath: "covers/amplifiercover.jpg"},
    {songName: "Lahore-Guru Randhawa" ,                 filePath: "songs/3.mp3", coverPath: "covers/lahorecover.jpg"},
    {songName: "Main Jis Din-Jubin ", filePath: "songs/4.mp3", coverPath: "covers/maijisdin.jpg"},
    {songName: "Na Ja-Pav Dharia" ,                  filePath: "songs/5.mp3", coverPath: "covers/najacover.jpg"},
    {songName: "Lut Gaye-Jubin" ,               filePath: "songs/6.mp3", coverPath: "covers/lutgayecover.jpg"},
]

songItems.forEach((element,i)=>{
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
})

//Handle play/pause click
masterplay.addEventListener('click', ()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterplay.classList.remove('fa-play-circle');
        masterplay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;
    }
    else{
        audioElement.pause();
        masterplay.classList.remove('fa-pause-circle');
        masterplay.classList.add('fa-play-circle');
        gif.style.opacity = 0;
    }
})


audioElement.addEventListener('timeupdate', ()=>{
    //update seekbar
    progress = parseInt((audioElement.currentTime/audioElement.duration)*100);
    myProgressBar.value = progress;

})

myProgressBar.addEventListener('change' , ()=>{
    audioElement.currentTime = myProgressBar.value * audioElement.duration/100;
})

const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    })
}

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click', (e)=>{
        if(audioElement.paused || audioElement.currentTime<=0){
            makeAllPlays();
            songIndex =parseInt(e.target.id);
            e.target.classList.remove('fa-play-circle');
            e.target.classList.add('fa-pause-circle');
            audioElement.src = `songs/${songIndex}.mp3`;
            masterSongName.innerText = songs[songIndex-1].songName;
            audioElement.currentTime = 0
            audioElement.play();
            gif.style.opacity = 1;
            masterplay.classList.remove('fa-play-circle');
            masterplay.classList.add('fa-pause-circle');
        }
        else{
            audioElement.pause();
            masterplay.classList.remove('fa-pause-circle');
            masterplay.classList.add('fa-play-circle');
            gif.style.opacity = 0;
            e.target.classList.add('fa-play-circle');
            e.target.classList.remove('fa-pause-circle');
        }
       
    })
}) 

document.getElementById('next').addEventListener('click',()=>{
    if(songIndex>=6){
        songIndex=1;
    }
    else{
        songIndex += 1;
    }
    audioElement.src = `songs/${songIndex}.mp3`;
       masterSongName.innerText = songs[songIndex-1].songName;
       audioElement.currentTime =0;
       audioElement.play();
       masterplay.classList.remove('fa-play-circle');
       masterplay.classList.add('fa-pause-circle');
})

document.getElementById('previous').addEventListener('click',()=>{
    if(songIndex<=1){
        songIndex=6;
    }
    else{
        songIndex -= 1;
    }
    audioElement.src = `songs/${songIndex}.mp3`;
       masterSongName.innerText = songs[songIndex-1].songName;
       audioElement.currentTime =0;
       audioElement.play();
       masterplay.classList.remove('fa-play-circle');
       masterplay.classList.add('fa-pause-circle');
})