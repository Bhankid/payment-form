const form = document.querySelector(".form");
const nameInput = document.getElementById("name");
const numberInput = document.getElementById("number");
const dateInput = document.getElementById("date");
const cvvInput = document.getElementById("cvv");

const visa = document.querySelector(".card");

// SHOW ERROR
function showError(element, error) {
  element.style.opacity = error ? "1" : "0";
}

// CHANGE THE FORMAT NAME
nameInput.addEventListener("input", function () {
  const alert1 = document.getElementById("alert-1");
  const error = !this.value;
  showError(alert1, error);
  document.getElementById("card-name").textContent = this.value || "Name";
});

// CHANGE THE FORMAT CARD NUMBER
numberInput.addEventListener("input", function () {
  this.value = numberAutoFormat();

  // Show error when the length is not 19 (16 digits and 3 spaces)
  const alert2 = document.getElementById("alert-2");
  const error = this.value.length !== 19;
  showError(alert2, error);

  document.querySelector(".card__number").textContent =
    this.value || "#### #### #### ####";
});

function numberAutoFormat() {
  let valueNumber = numberInput.value;
  // Remove all non-digit characters
  const v = valueNumber.replace(/\s+/g, "").replace(/\D/g, "");

  // Match groups of 4 digits, up to 16 digits
  const matches = v.match(/\d{1,16}/g);
  const match = (matches && matches[0]) || "";
  const parts = [];

  for (let i = 0; i < match.length; i += 4) {
    parts.push(match.substring(i, i + 4));
  }

  // Join parts with a space
  return parts.join(" ") || valueNumber;
}

// CHANGE THE FORMAT DATE
dateInput.addEventListener("input", function () {
  this.value = dateAutoFormat();

  // Show error if the date is invalid
  const alert3 = document.getElementById("alert-3");
  showError(alert3, isNotDate(this));

  const dateNumber = dateInput.value.split("/");
  document.getElementById("month").textContent = dateNumber[0] || "MM";
  document.getElementById("year").textContent = dateNumber[1] || "YY";
});

function isNotDate(element) {
  const actualDate = new Date();
  const month = actualDate.getMonth() + 1; // January is 0, so add 1
  const year = Number(actualDate.getFullYear().toString().slice(-2)); // 2024 -> 24
  const dateNumber = element.value.split("/");
  const monthNumber = Number(dateNumber[0]);
  const yearNumber = Number(dateNumber[1]);

  return (
    !element.value ||
    monthNumber < 1 ||
    monthNumber > 12 ||
    yearNumber < year ||
    (monthNumber <= month && yearNumber === year)
  );
}

function dateAutoFormat() {
  const dateValue = dateInput.value;
  // Remove all non-digit characters
  const v = dateValue.replace(/\s+/g, "").replace(/\D/g, "");

  // Match pairs of digits, up to 4 digits total
  const matches = v.match(/\d{1,4}/g);
  const match = (matches && matches[0]) || "";
  const parts = [];

  for (let i = 0; i < match.length; i += 2) {
    parts.push(match.substring(i, i + 2));
  }

  // Join parts with a slash
  return parts.join("/") || dateValue;
}

// CHANGE THE FORMAT CVV
cvvInput.addEventListener("input", function () {
  const alert4 = document.getElementById("alert-4");
  const error = this.value.length < 3;
  showError(alert4, error);
});

// CHECK IF KEY PRESSED IS A NUMBER (input of card number, date and cvv)
function isNumeric(event) {
  const key = event.key;
  return /\d/.test(key) || key === "Backspace" || key === "Tab";
}

numberInput.addEventListener("keydown", isNumeric);
dateInput.addEventListener("keydown", isNumeric);
cvvInput.addEventListener("keydown", isNumeric);

// VALIDATION FORM WHEN PRESS THE BUTTON
form.addEventListener("submit", function (e) {
  // Validate form
  if (
    !nameInput.value ||
    numberInput.value.length !== 19 ||
    dateInput.value.length !== 5 ||
    isNotDate(dateInput) ||
    cvvInput.value.length < 3
  ) {
    e.preventDefault();
  }

  // Show alerts for empty inputs
  const inputs = document.querySelectorAll("input");
  inputs.forEach((input) => {
    if (!input.value) {
      input.nextElementSibling.style.opacity = "1";
    }
  });
});
