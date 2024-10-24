const audio = document.getElementById("audio-player");
const playBtn = document.getElementById("play");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const progress = document.getElementById("progress");
const volume = document.getElementById("volume");

// List of songs (add more songs here)
const songs = ["song1.mp3", "song2.mp3", "song3.mp3"];
let songIndex = 0;

// Play and Pause functionality
playBtn.addEventListener("click", () => {
    if (audio.paused) {
        audio.play();
        playBtn.textContent = "Pause";
    } else {
        audio.pause();
        playBtn.textContent = "Play";
    }
});

// Next track functionality
nextBtn.addEventListener("click", () => {
    songIndex = (songIndex + 1) % songs.length;
    loadSong(songs[songIndex]);
    audio.play();
});

// Previous track functionality
prevBtn.addEventListener("click", () => {
    songIndex = (songIndex - 1 + songs.length) % songs.length;
    loadSong(songs[songIndex]);
    audio.play();
});

// Load the selected song
function loadSong(song) {
    audio.src = song;
    playBtn.textContent = "Pause";
}

// Progress bar functionality
audio.addEventListener("timeupdate", () => {
    const progressPercent = (audio.currentTime / audio.duration) * 100;
    progress.value = progressPercent;
});

// Seek through the song
progress.addEventListener("input", () => {
    const newTime = (progress.value / 100) * audio.duration;
    audio.currentTime = newTime;
});

// Volume control functionality
volume.addEventListener("input", () => {
    audio.volume = volume.value;
});
