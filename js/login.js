function start() {
   var email = document.getElementById('email');
   var nickname = document.getElementById('nickname');

   function nicknameCallback(response) {
      response = JSON.parse(response);
      if(response.success)
         if(response.nicknameExists)
            nickname.setCustomValidity('Nickname alredy taken, please change it');
         else
            nickname.setCustomValidity('');
   }
   function emailCallback(response) {
      response = JSON.parse(response);
      if(response.success)
         if(response.emailExists)
            email.setCustomValidity('Email alredy associated with another account, please change it');
         else
            email.setCustomValidity('');
   }

   nickname.addEventListener('change', function() {
      var url = 'nicknameExists.php';
      var method = 'GET';
      var queryString = 'nickname=' + nickname.value;
      var async = true;
      ajaxRequest(url, method, queryString, async, nicknameCallback);
   }, false);

   email.addEventListener('change', function() {
      var url = 'emailExists.php';
      var method = 'GET';
      var queryString = 'email=' + email.value;
      var async = true;
      ajaxRequest(url, method, queryString, async, emailCallback);
   }, false);
}