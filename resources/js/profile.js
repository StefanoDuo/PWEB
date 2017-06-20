function start() {
	document.getElementById('updateEmail').addEventListener('click', function(event) {
		event.preventDefault();
		this.disabled = true;
		var nickname = document.getElementById('nickname').firstChild.textContent;
		var email = document.getElementById('email').value;
		var url = 'updateEmail.php';
      var method = 'POST';
      var queryString = 'nickname=' + nickname + '&email=' + email;
      var async = true;
      var successCallback = function(response) {
         var response = JSON.parse(response);
         if(!response.success) {
      		
         }

         var updateEmailButton = document.getElementById('updateEmail');
         updateEmailButton.className += ' success';
         window.setTimeout(function() {
         	return function() {
	      		updateEmailButton.classeName = updateEmailButton.classeName.replace('success', '');
	      		updateEmailButton.disabled = false;
         	}
         }(), 5000);
      }
      ajaxRequest(url, method, queryString, async, successCallback);
	}, false);
	document.getElementById('updatePassword').addEventListener('click', function(event) {
		event.preventDefault();
		var nickname = document.getElementById('nickname').firstChild.textContent;
		var password = document.getElementById('password').value;
		var url = 'updatePassword.php';
      var method = 'POST';
      var queryString = 'nickname=' + nickname + '&password=' + password;
      var async = true;
      var successCallback = function(response) {
         response = JSON.parse(response);
      }
      ajaxRequest(url, method, queryString, async, successCallback);
	}, false);
}