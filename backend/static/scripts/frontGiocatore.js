// Get the URL query parameters
const urlParams = new URLSearchParams(window.location.search);
// Retrieve the value of the 'userId' parameter
const userId = urlParams.get('userId');

console.log(userId);

/* get more info about user
var xhr = new XMLHttpRequest();
xhr.open('GET', '/api/v1/giocatore:/'+userId, true);
xhr.setRequestHeader('Content-Type', 'application/json');

xhr.onreadystatechange = function() {
    if (xhr.readyState === 4) {
      var response = JSON.parse(xhr.responseText);
      console.log(response);
    }
}
*/
