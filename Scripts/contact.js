// Select the form element
const form = document.querySelector("form");

// Add an event listener to the form submission
form.addEventListener("submit", (e) => {
  e.preventDefault(); // Prevent the default form submission behavior

  // Check if the form is valid using the validateForm function
  // If the form is not valid, return and do not proceed with form submission
  if (!validateForm(form)) return;

  // If the form is valid, display an alert indicating successful form submission
  alert("Message successfully sent");
});

// Function to validate the form fields
const validateForm = (form) => {
  let valid = true; // A variable to track if the form is valid

  // Get references to the name, message, and email input fields
  let name = form.querySelector(".name");
  let message = form.querySelector(".message");
  let email = form.querySelector(".email");

  // Check if the name field is empty, if so, show an error and set valid to false
  if (name.value === "") {
    giveError(name, "Please enter your name");
    valid = false;
  }

  // Check if the message field is empty, if so, show an error and set valid to false
  if (message.value === "") {
    giveError(message, "Please enter your message");
    valid = false;
  }

  // Regular expression to validate email format
  let emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  let emailValue = email.value;

  // Check if the email format is valid, if not, show an error and set valid to false
  if (!emailRegex.test(emailValue)) {
    giveError(email, "Please enter a valid email");
    valid = false;
  }

  // Return true if the form is valid, otherwise, return false
  return valid;
};

// Function to display an error message for the specified field
const giveError = (field, message) => {
  let parentElement = field.parentElement;
  parentElement.classList.add("error");

  // Check if an error message already exists, if so, remove it
  let existingError = parentElement.querySelector(".err-msg");
  if (existingError) {
    existingError.remove();
  }

  // Create a new error message element and append it to the parent element
  let error = document.createElement("span");
  error.textContent = message;
  error.classList.add("err-msg");
  parentElement.appendChild(error);
};

// Select all input and textarea fields in the form
const inputs = document.querySelectorAll("input");
const textarea = document.querySelectorAll("textarea");

// Combine all input and textarea fields into one array
let allFields = [...inputs, ...textarea];

// Add an event listener to each field that triggers when the user inputs text
allFields.forEach((field) => {
  field.addEventListener("input", () => {
    removeError(field); // Call the removeError function to clear any existing error messages
  });
});

// Function to remove the error styling and message for the specified field
const removeError = (field) => {
  let parentElement = field.parentElement;
  parentElement.classList.remove("error");

  // Check if an error message exists, if so, remove it
  let error = parentElement.querySelector(".err-msg");
  if (error) {
    error.remove();
  }
};
