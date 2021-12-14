player = document.querySelector('.player');
video = document.querySelector('.video');
screenPlayBtn = document.querySelector('.screen_play');
playBtn = document.getElementById('play-pause');
mute = document.getElementById('mute-muted');
fullscreen = document.getElementById('full-screen');
timestamp = document.getElementById('timestamp');
volume = document.getElementById('sound-bar');
progress = document.querySelector('.time-bar');



// pl-ps
function togglePlayPause() {
    if(video.paused){
        video.play();
        playBtn.className = 'pause';
        screenPlayBtn.style.display = 'none';
    } else {
        playBtn.className = 'play';
        video.pause();
        screenPlayBtn.style.display = 'block';
    }
};
//вызов
playBtn.addEventListener('click', () => { togglePlayPause(); })
screenPlayBtn.addEventListener('click', () => { togglePlayPause(); })
video.addEventListener('click', () => { togglePlayPause(); })


// таймлайн+перемотка
function updateProgressTime() {
    progress.value = (video.currentTime / video.duration) * 100;

    let mins = Math.floor(video.currentTime / 60);
    if (mins < 10) {
        mins = '0' + mins;
    }

    let secs = Math.floor(video.currentTime / 60);
    if (secs < 10) {
        secs = '0' + secs;
    }

    timestamp.textContent = `${mins}:${secs}`;

    if (video.currentTime == video.duration) {
        playBtn.className = 'play';
    }
}

function setVideoProgress() {
    video.currentTime = (progress.value * video.duration) / 100;
}
//вызов
progress.addEventListener('input', () => {setVideoProgress(); })
video.addEventListener('timeupdate', () => {updateProgressTime(); })

// Fullscreen
function switchFullscreen() {
    if (document.fullscreenElement === player) {
        document.exitFullscreen();
    } else {
        player.requestFullscreen();
    }
}
// слушатель
fullscreen.addEventListener('click', function () {
    switchFullscreen();
})
video.addEventListener('dblclick', function () {
    switchFullscreen();
})
screenPlayBtn.addEventListener('dblclick', function () {
    switchFullscreen();
})

// замутить
function soundToggle(){
    video.muted = !video.muted;
    mute.classList.toggle('muted')
}
// вызов (так и не придумал как адекватно ему работать)
volume.addEventListener('input', (e) => {video.volume = e.target.value;
    if(video.volume === 0 && !video.muted){
        video.muted = true;
       mute.classList.add('muted');
    } else if (video.volume > 0 && video.muted){
        video.muted = false;
       mute.classList.remove('muted');
   }})
mute.addEventListener('click', () => {soundToggle(); })
