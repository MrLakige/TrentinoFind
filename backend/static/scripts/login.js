const localToken = localStorage.getItem('token');
fetch('/api/v1/authentication',{
  headers: {
    'Authorization': `Bearer ${token}`
  }
}).then(response =>{

}).catch(error =>{

})

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('loginForm').addEventListener('submit', function(event) {
      event.preventDefault(); // Prevent form submission
      
      var email = document.getElementById('email').value;
      var password = document.getElementById('password').value;
      
      var xhr = new XMLHttpRequest();
      xhr.open('POST', '/api/v1/authentication', true);
      xhr.setRequestHeader('Content-Type', 'application/json');
      
      xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
          var response = JSON.parse(xhr.responseText);
          console.log(response);
          if (xhr.status === 200) {
            // Successful login
            document.getElementById('message').innerHTML = 'Login successful!';
            if(response.self){
              console.log(response.self);
              // save token 
              localStorage.setItem('token', response.token);
              // redirect
              window.location.href=response.self+'?userId='+response.userId;
            }
          } else {
            // Failed login
            document.getElementById('message').innerHTML = 'Login failed. Please try again.';
          }
        }
      };
      
      var data = JSON.stringify({ email: email, password: password });
      xhr.send(data);
    });
  });
  