// script.js

document.getElementById('personForm').addEventListener('submit', function(event) {
  event.preventDefault(); // Prevent the form from submitting traditionally

  const name = document.getElementById('name').value;

  // Generate a unique ID
  const uniqueID = generateUniqueID();

  // Send data to the server
  fetch('/api/savePerson', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: name,
      id: uniqueID
    })
  })
  .then(response => response.json())
  .then(data => {
    console.log('Data saved successfully:', data);
    // Handle success or show a confirmation message to the user
  })
  .catch(error => {
    console.error('Error saving data:', error);
    // Handle errors and show an error message to the user
  });
});

function generateUniqueID() {
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const numbers = '0123456789';
  let id = '';

  // Add 3 random letters
  for (let i = 0; i < 3; i++) {
    id += letters.charAt(Math.floor(Math.random() * letters.length));
  }

  // Add 3 random numbers
  for (let i = 0; i < 3; i++) {
    id += numbers.charAt(Math.floor(Math.random() * numbers.length));
  }

  return id;
}
