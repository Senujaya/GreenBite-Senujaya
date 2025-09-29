document.addEventListener("DOMContentLoaded", () => {

  /* ===== HOME ===== */
  // Hero Quotes
  const quotes = [
    "Eat Healthy, Live Happy!",
    "Your Daily Dose of Fitness & Nutrition",
    "Fresh Food, Fresh Mind",
    "Move, Meditate, Nourish"
  ];
  let quoteIndex = 0;
  const quoteText = document.getElementById("quote-text");
  function rotateQuote() {
    if (!quoteText) return;
    quoteText.textContent = quotes[quoteIndex];
    quoteIndex = (quoteIndex + 1) % quotes.length;
  }
  setInterval(rotateQuote, 4000);
  rotateQuote();

  // Hero Image Slider
  const sliderImages = document.querySelectorAll(".slider img");
  let imgIndex = 0;
  function rotateImages() {
    if (sliderImages.length === 0) return;
    sliderImages.forEach(img => img.style.display = "none");
    sliderImages[imgIndex].style.display = "block";
    imgIndex = (imgIndex + 1) % sliderImages.length;
  }
  setInterval(rotateImages, 5000);
  rotateImages();

  // Health Tip
  const tips = [
    "Drink at least 8 glasses of water daily.",
    "Take a 10-minute walk after meals.",
    "Include more leafy greens in your diet.",
    "Practice deep breathing for 5 minutes every day.",
    "Sleep 7–8 hours for optimal health."
  ];
  const healthTip = document.getElementById("healthTip");
  if (healthTip) {
    healthTip.textContent = tips[Math.floor(Math.random() * tips.length)];
  }

  /* ===== MODALS (Recipes) ===== */
  const modals = document.querySelectorAll(".modal");
  const recipeCards = document.querySelectorAll(".recipe-card");
  recipeCards.forEach((card, i) => {
    card.addEventListener("click", () => {
      if (modals[i]) modals[i].style.display = "flex";
    });
  });
  modals.forEach(modal => {
    const close = modal.querySelector(".close");
    if (close) close.addEventListener("click", () => modal.style.display = "none");
  });
  window.addEventListener("click", e => {
    modals.forEach(modal => {
      if (e.target === modal) modal.style.display = "none";
    });
  });

  /* ===== CALCULATOR ===== */
  const progressBars = document.querySelectorAll(".progress-bar-fill");
  progressBars.forEach(bar => {
    const value = bar.dataset.value || 0;
    bar.style.width = "0";
    setTimeout(() => {
      bar.style.width = `${value}%`;
    }, 200);
  });

  /* ===== WORKOUT ===== */
  const workoutTimer = document.getElementById("workout-timer");
  const beep = new Audio("./beep.mp3");
  let timerInterval;
  function startWorkoutCountdown(seconds) {
    clearInterval(timerInterval);
    let time = seconds;
    if (workoutTimer) workoutTimer.textContent = time;
    timerInterval = setInterval(() => {
      time--;
      if (time < 0) {
        clearInterval(timerInterval);
        if (beep) beep.play();
        return;
      }
      if (workoutTimer) workoutTimer.textContent = time;
    }, 1000);
  }

  /* ===== MINDFULNESS TIMER ===== */
  const circularTimers = document.querySelectorAll(".timer-container");
  circularTimers.forEach(timer => {
    const svgCircle = timer.querySelector(".timer-circle-progress");
    const text = timer.querySelector(".timer-text");
    if (!svgCircle || !text) return;
    const radius = svgCircle.r.baseVal.value;
    const circumference = 2 * Math.PI * radius;
    svgCircle.style.strokeDasharray = circumference;
    let duration = parseInt(timer.dataset.seconds) || 60;
    let elapsed = 0;
    const timerInterval = setInterval(() => {
      elapsed++;
      const offset = circumference - (elapsed / duration) * circumference;
      svgCircle.style.strokeDashoffset = offset;
      text.textContent = Math.max(duration - elapsed, 0);
      if (elapsed >= duration) clearInterval(timerInterval);
    }, 1000);
  });

});