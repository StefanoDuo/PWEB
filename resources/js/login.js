function start() {
   function createErrorMessage(errorMessage) {
      var loginErrorMessage = document.createElement('span');
      loginErrorMessage.id = 'loginErrorMessage';
      loginErrorMessage.className = 'errorMessage';
      loginErrorMessage.textContent = errorMessage;
      document.getElementById('signup').appendChild(loginErrorMessage);
   }
   function removeErrorMessage() {
      var loginErrorMessage = document.getElementById('loginErrorMessage');
      if(loginErrorMessage)
         loginErrorMessage.remove();
   }


   var email = document.getElementById('email');
   var nickname = document.getElementById('nickname');
   removeErrorMessage();
   
   function nicknameCallback(response) {
      response = JSON.parse(response);
      removeErrorMessage();
      if(response.success && response.nicknameExists) {
         var errorMessage = 'Nickname alredy taken, please change it.';
         nickname.setCustomValidity(errorMessage);
         createErrorMessage(errorMessage);
      } else
         nickname.setCustomValidity('');
   }
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

   nickname.addEventListener('change', function() {
      var url = 'endpoints/nicknameExists.php';
      var method = 'GET';
      var queryString = 'nickname=' + nickname.value;
      var async = true;
      ajaxRequest(url, method, queryString, async, nicknameCallback);
   }, false);

   email.addEventListener('change', function() {
      var url = 'endpoints/emailExists.php';
      var method = 'GET';
      var queryString = 'email=' + email.value;
      var async = true;
      ajaxRequest(url, method, queryString, async, emailCallback);
   }, false);
}