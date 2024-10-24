const audio = document.getElementById("audio-player");
const fileSelect = document.getElementById("fileSelect");
const fileElem = document.getElementById("fileElem");
const dropArea = document.getElementById("drop-area");
const playBtn = document.getElementById("play");
const progress = document.getElementById("progress");
const volume = document.getElementById("volume");

// Handle file selection button
fileSelect.addEventListener("click", () => fileElem.click());

fileElem.addEventListener("change", handleFiles);

// Drag and Drop functionality
dropArea.addEventListener("dragover", (e) => {
    e.preventDefault();
    dropArea.style.backgroundColor = "#e9e9e9";
});

dropArea.addEventListener("dragleave", () => {
    dropArea.style.backgroundColor = "#f9f9f9";
});

dropArea.addEventListener("drop", (e) => {
    e.preventDefault();
    dropArea.style.backgroundColor = "#f9f9f9";
    const files = e.dataTransfer.files;
    handleFiles({ target: { files } });
});

// Handle file input
function handleFiles(e) {
    const file = e.target.files[0];
    if (file && file.type.startsWith("audio/")) {
        const reader = new FileReader();
        reader.onload = (event) => {
            audio.src = event.target.result;
            audio.play();
            playBtn.textContent = "Pause";
        };
        reader.readAsDataURL(file);
    } else {
        alert("Please upload an audio file.");
    }
}

// Play/Pause button functionality
playBtn.addEventListener("click", () => {
    if (audio.paused) {
        audio.play();
        playBtn.textContent = "Pause";
    } else {
        audio.pause();
        playBtn.textContent = "Play";
    }
});

// Progress bar functionality
audio.addEventListener("timeupdate", () => {
    const progressPercent = (audio.currentTime / audio.duration) * 100;
    progress.value = progressPercent;
});

progress.addEventListener("input", () => {
    const newTime = (progress.value / 100) * audio.duration;
    audio.currentTime = newTime;
});

// Volume control functionality
volume.addEventListener("input", () => {
    audio.volume = volume.value;
});
