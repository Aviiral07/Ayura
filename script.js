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
// Appointment form
document.getElementById('appointmentForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const appointmentData = {
        name: document.getElementById('patientName').value,
        email: document.getElementById('email').value,
        doctor: document.getElementById('doctorSelect').value,
        date: document.getElementById('appointmentDate').value,
        time: document.getElementById('appointmentTime').value,
        reason: document.getElementById('reason').value
    };

    fetch('http://localhost:3000/book-appointment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(appointmentData)
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            document.getElementById('appointmentResult').innerHTML = 
                `<div style="background:#d4edda; padding:15px; border-radius:8px; color:#155724;">
                    ✅ <strong>Appointment Confirmed!</strong><br>
                    Name: ${data.appointment.name}<br>
                    Doctor: ${data.appointment.doctor}<br>
                    Date: ${data.appointment.date}<br>
                    Time: ${data.appointment.time}<br>
                    Status: ${data.appointment.status}
                </div>`;
        }
    })
    .catch(error => {
        document.getElementById('appointmentResult').innerHTML = 
            `<span style="color:red;">Error: ${error}</span>`;
    });
});

// Chatbot
document.addEventListener('DOMContentLoaded', function() {
    const chatInput = document.getElementById('chatInput');
    const sendBtn = document.getElementById('sendBtn');
    const chatMessages = document.getElementById('chatMessages');

    function sendMessage() {
        const userMsg = chatInput.value.trim();
        if (!userMsg) return;

        // User ka message dikhao
        chatMessages.innerHTML += `
            <div style="text-align:right; margin:8px 0;">
                <span style="background:#4CAF50; color:white; padding:8px 12px; border-radius:12px; display:inline-block;">${userMsg}</span>
            </div>`;
        
        chatInput.value = '';
        chatMessages.scrollTop = chatMessages.scrollHeight;

        // Bot se response lo
        fetch('http://127.0.0.1:5000/chatbot', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ query: userMsg })
        })
        .then(res => res.json())
        .then(data => {
            chatMessages.innerHTML += `
                <div style="text-align:left; margin:8px 0;">
                    <span style="background:#e0e0e0; color:#333; padding:8px 12px; border-radius:12px; display:inline-block;">🤖 ${data.response}</span>
                </div>`;
            chatMessages.scrollTop = chatMessages.scrollHeight;
        })
        .catch(() => {
            chatMessages.innerHTML += `
                <div style="text-align:left; margin:8px 0;">
                    <span style="background:#ffcccc; padding:8px 12px; border-radius:12px; display:inline-block;">❌ Bot se connect nahi ho pa raha!</span>
                </div>`;
        });
    }

    if (sendBtn) sendBtn.addEventListener('click', sendMessage);
    if (chatInput) chatInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') sendMessage();
    });
});