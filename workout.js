const workoutResult = document.getElementById("workoutResult");
const exerciseSound = new Audio("./Sounds/beep.mp3");

// ----- Start Workout -----
function startWorkout(exercises, duration = 10) {
  let index = 0;

  // Clear previous content
  workoutResult.innerHTML = "";

  // Create blocks for each exercise
  exercises.forEach((exercise, i) => {
    const div = document.createElement("div");
    div.className = "exercise-block";
    div.innerHTML = `
      <h3>${exercise}</h3>
      <div class="timerBox">00:${String(duration).padStart(2,"0")}</div>
      <div class="progressContainer">
        <div class="progressBar"></div>
      </div>
    `;
    workoutResult.appendChild(div);
  });

  let blocks = document.querySelectorAll(".exercise-block");
  let seconds = duration;
  let timerBox = blocks[index].querySelector(".timerBox");
  let progressBar = blocks[index].querySelector(".progressBar");

  function runInterval() {
    const interval = setInterval(() => {
      seconds--;
      if (seconds >= 0) {
        timerBox.textContent = `00:${String(seconds).padStart(2,"0")}`;
        progressBar.style.width = ((seconds / duration) * 100) + "%";
      }

      if (seconds <= 0) {
        exerciseSound.play();
        clearInterval(interval);

        index++;
        if (index < blocks.length) {
          seconds = duration;
          timerBox = blocks[index].querySelector(".timerBox");
          progressBar = blocks[index].querySelector(".progressBar");
          runInterval();
        } else {
          workoutResult.innerHTML += "<p>Workout Complete!</p>";
        }
      }
    }, 1000);
  }

  runInterval();
}