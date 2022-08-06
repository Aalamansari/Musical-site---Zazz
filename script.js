console.log("Welcome to Zazz");       //To check if the javascript is working or not

//Initializing the song variables
let songIndex = 0;    //Initially konsa song play ho rha hai
let audioElement = new Audio('songs/1.mp3');
let masterplay = document.getElementById('masterplay');         //same id of main play/pause button jo html mai daala hai for masterplay(beech ka button)
let myProgressBar = document.getElementById('myProgressBar');   //same id of progress bar used in html 
let gif = document.getElementById('gif');                       //same id used for gif in html 
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));

let songs= [      
    {songName: "Satisfya-Imran Khan" ,               filePath: "songs/1.mp3", coverPath: "covers/satisfyacover.jpg"},
    {songName: "Amplifier-Imran Khan" ,              filePath: "songs/2.mp3", coverPath: "covers/amplifiercover.jpg"},
    {songName: "Lahore-Guru Randhawa" ,                 filePath: "songs/3.mp3", coverPath: "covers/lahorecover.jpg"},
    {songName: "Main Jis Din-Jubin ", filePath: "songs/4.mp3", coverPath: "covers/maijisdin.jpg"},
    {songName: "Na Ja-Pav Dharia" ,                  filePath: "songs/5.mp3", coverPath: "covers/najacover.jpg"},
    {songName: "Lut Gaye-Jubin" ,               filePath: "songs/6.mp3", coverPath: "covers/lutgayecover.jpg"},
]  //An array of object 

songItems.forEach((element,i)=>{                //To get the cover and name of songs we are using songItems.forEach where songItems is class name of container containing the songs name and covers 
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;  //we're getting the covers of songs from above described in coverpath in sequential order i from start to last
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName;//we're getting the name of songs from above described in songName and changing it with jo bhi text hai in songName class in html using innerText
})

//Handle play/pause click , masterplay par addEventListener lagao click ka agar kisi ne masterplay par click kiya toh ya toh song play hoga yaa pause hoga
masterplay.addEventListener('click', ()=>{
    if(audioElement.paused || audioElement.currentTime<=0){    //Agar audioElement paused hai ya start he nahi hua hai
        audioElement.play();                                   //audioElement matlab song ko play kardo
        masterplay.classList.remove('fa-play-circle');         //play sign ko remove kardo
        masterplay.classList.add('fa-pause-circle');           //pause sign ko add kardo
        gif.style.opacity = 1;                                  //gif ko start kardo
    }
    else{
        audioElement.pause();                                  //audioElement matlab song ko pause kardo
        masterplay.classList.remove('fa-pause-circle');        //pause sign  ko remove karo 
        masterplay.classList.add('fa-play-circle');            //play sign ko ad kardo
        gif.style.opacity = 0;
    }
})


audioElement.addEventListener('timeupdate', ()=>{        //jo audioElement matlab song play uska time hai woh timeupdate use karke update hoga 
    //update seekbar
    progress = parseInt((audioElement.currentTime/audioElement.duration)*100);  //progress ek variable hai jisme mai song ka (currenttime/Totallength of song)*100 store kar rha hu
    myProgressBar.value = progress;  //Iss step mai progress bar mai progress variable ki jo value aai previous step mai woh idar myProressBar mai store kar rha hu
                                      //Isse song jasie bajega waise progressbar bhi aage badega
})

myProgressBar.addEventListener('change' , ()=>{   //jaise progressBar ko change karunga waise he song bhi change hoga matlab agar progressbar ko 20 second aage scroll kiya toh song bhi 20 sec aage jaayga
    audioElement.currentTime = myProgressBar.value * audioElement.duration/100;  //simply upar wale formula ko change karke audioElement.currenttime nikala jisse audioElement.currenttime ki value change ho gai
})

const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{ //yaha par woh element aayga jo makeallpalys function call hone se pehle click kiya hoga
        element.classList.remove('fa-pause-circle');           
        element.classList.add('fa-play-circle');
    })
}

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{ //Array mai getElementByClassName use karke songItemPlay class ko access kiya , forEach use kiya taaki puray elements access ho
    element.addEventListener('click', (e)=>{            //addEventListener use kiya for click event matlab jab koi element ko click karega toh argument execute hoga
        if(audioElement.paused || audioElement.currentTime<=0){ //Agar audioElement paused hai ya start he nahi hua hai
            makeAllPlays();                   //makeAllPlays function call hoga jisse saare songs ke button play ho jaayenge, upar check kar line 54 par makeAllPlays call hokar jaayga
            songIndex =parseInt(e.target.id); //songIndex variable mai html mai har song ke liye ek id number daala hai jo idar access hoga using e.target.id aur ParseInt use hoga kyuki id ki value integer hai so read karne ke liye
            e.target.classList.remove('fa-play-circle');
            e.target.classList.add('fa-pause-circle');
            audioElement.src = `songs/${songIndex}.mp3`; //audioElement.src songs/songIndex.mp3 read karega matlab songs folder mai it will check for songIndex.mp3 song eg:songIndex=3 toh songs/3.mp3 check karega
            masterSongName.innerText = songs[songIndex-1].songName;//masterSongName waali id mai inner text change karenge with songs array mai upar line 12 mai songIndex-1.songName hai
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

document.getElementById('next').addEventListener('click',()=>{ //addEventListener for click event, jab koi next id waale button par click karega toh argument execute hoga
    if(songIndex>=6){
        songIndex=1;
    }
    else{
        songIndex += 1;
    }
    audioElement.src = `songs/${songIndex}.mp3`;
       masterSongName.innerText = songs[songIndex-1].songName;//masterSongName waali id mai inner text change karenge with songs array mai upar line 12 mai songIndex-1.songName hai
       audioElement.currentTime =0;
       audioElement.play();
       masterplay.classList.remove('fa-play-circle');
       masterplay.classList.add('fa-pause-circle');
})

document.getElementById('previous').addEventListener('click',()=>{  //addEventListener for click event, jab koi previous id waale button par click karega toh argument execute hoga
    if(songIndex<=1){
        songIndex=6;
    }
    else{
        songIndex -= 1;
    }
    audioElement.src = `songs/${songIndex}.mp3`;
       masterSongName.innerText = songs[songIndex-1].songName;//masterSongName waali id mai inner text change karenge with songs array mai upar line 12 mai songIndex-1.songName hai
       audioElement.currentTime =0;
       audioElement.play();
       masterplay.classList.remove('fa-play-circle');
       masterplay.classList.add('fa-pause-circle');
})