// Hero Slider - Images Sliding
const slides = document.querySelector('.slides');
const totalSlides = slides.children.length;
let index = 0;

function showNextSlide() {
  index = (index + 1) % totalSlides;
  slides.style.transform = `translateX(-${index * 100}%)`;
}

// Slide with 5 seconds intervals
setInterval(showNextSlide, 5000);

// Daily Health Tips
const tips = [
  "Start your day with a glass of water.",
  "Include vegetables in every meal.",
  "Take a 10-minute walk after lunch.",
  "Practice deep breathing for 5 minutes.",
  "Limit sugar and processed foods.",
  "Aim for 7-8 hours of sleep.",
  "Eat a piece of fruit instead of snacks."
];
const day = new Date().getDate();
document.getElementById('daily-tip').textContent = tips[day % tips.length];

// Newsletter Form
document.getElementById('newsletter-form').addEventListener('submit', function(e) {
  e.preventDefault();
  const email = document.getElementById('newsletter-email').value.trim();
  if(email) {
    localStorage.setItem('newsletterEmail', email);
    document.getElementById('newsletter-msg').textContent = "Subscribed successfully!";
    this.reset();
  } else {
    alert("Please enter a valid email.");
  }
});