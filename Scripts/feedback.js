// Event listener for the form submission
document.getElementById('feedback-form').addEventListener('submit', function (event) {
  event.preventDefault(); // Prevent the default form submission behavior
  sendForm(); // Call the sendForm function to process the form data
});

function sendForm() {
  // Validate required fields
  var rating = document.querySelector('input[name="rating"]:checked');
  var reasons = document.querySelector('textarea[name="reasons"]');
  removeErrorMsg(); // Clear any previous error messages

  var errors = false; // Variable to track if there are any errors in the form inputs

  // Check if the rating input is not selected
  if (!rating) {
    displayErrorMsg('Please choose a rating', 'rating-error', document.querySelector('.radio-group'));
    applyErrorOutline(document.querySelectorAll('.radio-label'));
    errors = true; // Set errors to true, indicating there is an error
  }

  // Check if the reasons input is empty or only contains whitespace
  if (!reasons || reasons.value.trim() === '') {
    displayErrorMsg('Please provide reasons for your rating', 'reasons-error', reasons);
    applyErrorOutline([reasons]);
    errors = true; // Set errors to true, indicating there is an error
  }

  // If there are any errors, stop further processing of the form
  if (errors) {
    return;
  }

  // Get form data
  var task_completion = document.querySelector('select[name="task_completion"]').value;
  var task_preference = document.querySelector('select[name="task_preference"]').value;

  // Compose the email content
  var subject = 'Form Submission';
  var body = 'Rating: ' + rating.value + '\n'
    + 'Reasons: ' + reasons.value + '\n'
    + 'Task Completion: ' + task_completion + '\n'
    + 'Task Preference: ' + task_preference + '\n';

  // Send email using the mailto protocol
  window.location.href = 'mailto:shalindifernando02@gmail.com?subject=' + encodeURIComponent(subject) + 
  '&body=' + encodeURIComponent(body);

  // Hide the form and show the "Thank You" message
  document.getElementById('feedback-form').style.display = 'none';
  document.getElementById('thank-you').style.display = 'block';
}

// Function to display error messages
function displayErrorMsg(message, id, element) {
  // Check if the error message element with the given ID already exists
  if (document.getElementById(id)) {
    return; // If it exists, return to avoid creating duplicate error messages
  }

  // Create a new div element to display the error message
  var errorDiv = document.createElement('div');
  errorDiv.id = id; // Set the ID of the div to the given ID
  errorDiv.innerHTML = '<p style="color: red;">' + message + '</p>'; // Set the error message content
  element.parentNode.insertBefore(errorDiv, element.nextSibling); // Insert the error message after the specified element
}

// Function to remove any existing error messages
function removeErrorMsg() {
  // Select all elements with IDs "rating-error" and "reasons-error"
  var errorMsgs = document.querySelectorAll('#rating-error, #reasons-error');
  errorMsgs.forEach(function (msg) {
    msg.remove(); // Remove each error message element from the DOM
  });

  removeErrorOutline(document.querySelectorAll('.radio-label, textarea[name="reasons"]'));
  // Remove the error outline styling from radio labels and the reasons textarea
}

// Function to apply error outline styling to elements
function applyErrorOutline(elements) {
  elements.forEach(function (element) {
    element.classList.add('error-outline'); // Add the 'error-outline' class to each element
  });
}

// Function to remove error outline styling from elements
function removeErrorOutline(elements) {
  elements.forEach(function (element) {
    element.classList.remove('error-outline'); // Remove the 'error-outline' class from each element
  });
}


























