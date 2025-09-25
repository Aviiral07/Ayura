document.getElementById('doctorForm').addEventListener('submit', function(event) {
  event.preventDefault(); // Prevent form from refreshing the page

  // Collect form data
  const doctorData = {
    name: document.getElementById('name').value,
    registrationNumber: document.getElementById('registrationNumber').value,
    state: document.getElementById('state').value,
    specialization: document.getElementById('specialization').value,
    yearOfRegistration: parseInt(document.getElementById('yearOfRegistration').value)
  };

  // Send POST request to backend
  const response = fetch('http://localhost:3000/verify-doctor', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(doctorData)
  })
  .then(response => response.json())
  .then(data => {
    const resultDiv = document.getElementById('result');
    if (data.verified) {
      resultDiv.innerHTML = `<span style="color:green;font-weight:bold;">Doctor Verified!</span><br>
        Name: ${data.doctor.name}<br>
        Registration Number: ${data.doctor.registrationNumber}<br>
        State: ${data.doctor.state}<br>
        Specialization: ${data.doctor.specialization}<br>
        Year of Registration: ${data.doctor.yearOfRegistration}<br>
        Status: ${data.doctor.status}`;
    } else {
      resultDiv.innerHTML = `<span style="color:red;font-weight:bold;">Doctor NOT Verified!</span>`;
    }
  })
  .catch(error => {
    document.getElementById('result').innerHTML = `<span style="color:red;">Error connecting to backend: ${error}</span>`;
  });
});
