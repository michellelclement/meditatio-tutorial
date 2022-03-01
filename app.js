const app = () => {
    const song = document.querySelector('.song');
    const play = document.querySelector('.play');
    const outline = document.querySelector('.moving-outline circle');
    const video = document.querySelector('.vid-container video');

    // Get Sounds
    const sounds = document.querySelectorAll('.sound-picker button');
    //Get Time Display
    const timeDisplay = document.querySelector('.time-display');
    const timeSelect = document.querySelectorAll('.time-select button');
    //Get length of outline
    const outlineLength = outline.getTotalLength();
    //Duration
    let fakeDuration = 600;

    //Animate outline 
        outline.style.strokeDasharray = outlineLength;
        outline.style.strokeDashoffset = outlineLength;

//Play Sound
    play.addEventListener("click", () => {
        checkPlaying(song);
    });

//Select Sound
    timeSelect.forEach(option => {
        option.addEventListener('click', function(){
            fakeDuration = this.getAttribute('data-time');
            timeDisplay.textContent = `${Math.floor(fakeDuration / 60)}:${Math.floor(fakeDuration % 60)}`;
        });
    });


//Create function to stop and play the sounds
const checkPlaying = song =>{
    if(song.paused){
        song.play();
        video.play();
        play.src = '/svg/pause.svg';
    }else{
        song.pause();
        video.pause();
        play.src = '/svg/play.svg';
    }
}

//Animate the circle
song.ontimeupdate = () => {
    let currentTime = song.currentTime;
    let elapsed = fakeDuration - currentTime;
    let seconds = Math.floor(elapsed % 60);
    let minutes = Math.floor(elapsed / 60);


    //Animate the circle
    let progress = outlineLength - (currentTime / fakeDuration) * outlineLength;
    outline.style.strokeDashoffset = progress;
    //Animate the text
    timeDisplay.textContent = `${minutes}:${seconds}`
    }
};

app();