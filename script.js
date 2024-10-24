const audio = document.getElementById("audio-player");
const fileSelect = document.getElementById("fileSelect");
const fileElem = document.getElementById("fileElem");
const dropArea = document.getElementById("drop-area");
const playBtn = document.getElementById("play");
const progress = document.getElementById("progress");
const volume = document.getElementById("volume");

// Handle file selection button
fileSelect.addEventListener("click", () => {
    fileElem.click(); // Trigger the hidden file input
});

// Handle file input change event
fileElem.addEventListener("change", handleFiles);

// Drag and Drop functionality
dropArea.addEventListener("dragover", (e) => {
    e.preventDefault();
    dropArea.style.backgroundColor = "#e9e9e9"; // Change color on drag
});

dropArea.addEventListener("dragleave", () => {
    dropArea.style.backgroundColor = "#f9f9f9"; // Reset color
});

dropArea.addEventListener("drop", (e) => {
    e.preventDefault();
    dropArea.style.backgroundColor = "#f9f9f9"; // Reset color
    const files = e.dataTransfer.files;
    handleFiles({ target: { files } }); // Pass files to handleFiles
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
        alert("Please upload a valid audio file.");
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
    progress.value = progressPercent || 0; // Ensure no NaN value
});

progress.addEventListener("input", () => {
    const newTime = (progress.value / 100) * audio.duration;
    audio.currentTime = newTime;
});

// Volume control functionality
volume.addEventListener("input", () => {
    audio.volume = volume.value;
});
