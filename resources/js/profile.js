function start() {
	function createErrorMessage(errorMessage) {
      var emailErrorMessage = document.createElement('span');
      emailErrorMessage.id = 'emailErrorMessage';
      emailErrorMessage.className = 'errorMessage';
      emailErrorMessage.textContent = errorMessage;
      document.getElementById('emailCard').appendChild(emailErrorMessage);
   }
   function removeErrorMessage() {
      var emailErrorMessage = document.getElementById('emailErrorMessage');
      if(emailErrorMessage)
         emailErrorMessage.remove();
   }

   var email = document.getElementById('email');
   removeErrorMessage();

   function emailCallback(response) {
      response = JSON.parse(response);
      removeErrorMessage();
      if(response.success && response.emailExists) {
         var errorMessage = 'Email alredy associated with another account, please change it.';
         email.setCustomValidity(errorMessage);
         createErrorMessage(errorMessage);
      } else
         email.setCustomValidity('');
      if(!email.validity.valid && !response.emailExists)
         createErrorMessage(email.validationMessage);
   }
   email.addEventListener('change', function() {
      var url = 'endpoints/emailExists.php';
      var method = 'GET';
      var queryString = 'email=' + email.value;
      var async = true;
      ajaxRequest(url, method, queryString, async, emailCallback);
   }, false);
}