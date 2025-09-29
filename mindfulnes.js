// ----- Mindfulness Timer with Progress Circle -----
const meditationBox = document.getElementById("meditationBox");
const startBtn = document.getElementById("startMeditation");
const durationInput = document.getElementById("meditationDuration");
const progressBar = document.getElementById("progressBar");

let countdownInterval;

function startMeditation() {
  if (!durationInput || !meditationBox || !progressBar) return;

  let totalSeconds = parseInt(durationInput.value) * 60;
  if (isNaN(totalSeconds) || totalSeconds <= 0) {
    alert("Please enter a valid duration in minutes.");
    return;
  }

  clearInterval(countdownInterval);

  meditationBox.textContent = formatTime(totalSeconds);

  const circumference = 2 * Math.PI * 70; // circle radius = 70
  progressBar.style.strokeDasharray = circumference;
  progressBar.style.strokeDashoffset = 0;

  countdownInterval = setInterval(() => {
    totalSeconds--;
    meditationBox.textContent = formatTime(totalSeconds);

    // Update progress
    const progress = totalSeconds / (parseInt(durationInput.value) * 60);
    progressBar.style.strokeDashoffset = circumference * (1 - progress);

    if (totalSeconds <= 0) {
      clearInterval(countdownInterval);
      meditationBox.textContent = "Session Complete!";
      playSound();
    }
  }, 1000);
}

function formatTime(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${String(mins).padStart(2,"0")}:${String(secs).padStart(2,"0")}`;
}

function playSound() {
  const audio = new Audio("./Sounds/bell.mp3");
  audio.play();
}

if (startBtn) startBtn.addEventListener("click", startMeditation);