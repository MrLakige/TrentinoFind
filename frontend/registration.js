document.getElementById('registrationForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form submission
    
    var email = document.getElementById('email').value;
    var firstName = document.getElementById('firstName').value;
    var lastName = document.getElementById('lastName').value;
    var age = document.getElementById('age').value;
    var phone = document.getElementById('phone').value;
    var password = document.getElementById('password').value;
    var confirmPassword = document.getElementById('confirmPassword').value;
    
    // Validate inputs
    if (!validateEmail(email)) {
      displayErrorMessage('Invalid email');
      return;
    }
    
    if (!validatePassword(password)) {
      displayErrorMessage('Password must be at least 8 characters long');
      return;
    }
    
    if (password !== confirmPassword) {
      displayErrorMessage('Passwords do not match');
      return;
    }
    
    // Send registration data to backend API
    var xhr = new XMLHttpRequest();
    xhr.open('POST', '/api/v1/giocatori', true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    
    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          // Successful registration
          displaySuccessMessage('Registration successful!');
          // Redirect to another page or perform any other actions
        } else {
          // Failed registration
          displayErrorMessage('Registration failed. Please try again.');
        }
      }
    };
    
    var data = JSON.stringify({
      email: email,
      firstName: firstName,
      lastName: lastName,
      age: age,
      phone: phone,
      password: password
    });
    xhr.send(data);
  });
  
  function validateEmail(email) {
    // Simple email validation using regular expression
    var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  }
  
  function validatePassword(password) {
    // Validate password length
    return password.length >= 8;
  }
  
  function displayErrorMessage(message) {
    document.getElementById('message').innerHTML = '<span style="color: red;">' + message + '</span>';
  }
  
  function displaySuccessMessage(message) {
    document.getElementById('message').innerHTML = '<span style="color: green;">' + message + '</span>';
  }
  