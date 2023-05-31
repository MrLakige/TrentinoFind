document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('loginForm').addEventListener('submit', function(event) {
      event.preventDefault(); // Prevent form submission
      
      var email = document.getElementById('email').value;
      var password = document.getElementById('password').value;
      
      var xhr = new XMLHttpRequest();
      xhr.open('POST', '/api/v1/authentication', true);
      xhr.setRequestHeader('Content-Type', 'application/json');
      
      xhr.onreadystatechange = function() {
        //redirect to giocatore.html
        location.href = 'giocatore.html';          
        if (xhr.readyState === 4) {
          var response = JSON.parse(xhr.responseText);
    
          /*if (xhr.status === 200) {
            // Successful login
            document.getElementById('message').innerHTML = 'Login successful!';
            // Redirect to another page or perform any other actions
          } else {
            // Failed login
            document.getElementById('message').innerHTML = 'Login failed. Please try again.';
          }*/
        }
      };
      
      var data = JSON.stringify({ email: email, password: password });
      xhr.send(data);
    });
  });
  