document.addEventListener("DOMContentLoaded", () => {
  const calcForm = document.getElementById("calc-form");
  const resultsDiv = document.getElementById("results");

  calcForm.addEventListener("submit", function (e) {
    e.preventDefault();

    // ----- Get and sanitize input values -----
    let age = Math.max(0, parseInt(document.getElementById("age").value) || 0);
    let height = Math.max(0, parseFloat(document.getElementById("height").value) || 0);
    let weight = Math.max(0, parseFloat(document.getElementById("weight").value) || 0);
    const gender = document.getElementById("gender").value;
    const activity = parseFloat(document.getElementById("activity").value);
    const goal = document.getElementById("goal").value;

    if (age === 0 || height === 0 || weight === 0) {
      alert("Please enter values greater than zero.");
      return;
    }

    // ----- BMR Calculation -----
    let bmr = gender === "male"
      ? 10 * weight + 6.25 * height - 5 * age + 5
      : 10 * weight + 6.25 * height - 5 * age - 161;

    // ----- TDEE Calculation -----
    let tdee = bmr * activity;
    if (goal === "lose") tdee -= 500;
    if (goal === "gain") tdee += 500;

    // ----- Macro Calculation -----
    const proteinGrams = Math.min((0.2 * tdee) / 4, 300);
    const carbsGrams = Math.min((0.5 * tdee) / 4, 300);
    const fatGrams = Math.min((0.3 * tdee) / 9, 300);

    const proteinPercent = Math.min((proteinGrams / 300) * 100, 100);
    const carbsPercent = Math.min((carbsGrams / 300) * 100, 100);
    const fatPercent = Math.min((fatGrams / 300) * 100, 100);

    // ----- Display results -----
    resultsDiv.classList.remove("hidden");
    document.getElementById("bmr").textContent = Math.round(bmr);
    document.getElementById("tdee").textContent = Math.round(tdee);
    document.getElementById("protein-bar").style.width = proteinPercent + "%";
    document.getElementById("carbs-bar").style.width = carbsPercent + "%";
    document.getElementById("fat-bar").style.width = fatPercent + "%";

    document.getElementById("protein-text").textContent = Math.round(proteinGrams) + " g";
    document.getElementById("carbs-text").textContent = Math.round(carbsGrams) + " g";
    document.getElementById("fat-text").textContent = Math.round(fatGrams) + " g";
  });
});