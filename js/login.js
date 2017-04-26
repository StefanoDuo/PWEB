function start() {
   var email = document.getElementById('email');
   var nickname = document.getElementById('nickname');

   nickname.addEventListener('change', function() {
      var url = 'nicknameExists.php';
      var method = 'GET';
      var queryString = 'nickname=' + nickname.value;
      var async = true;
      var successCallback = function(response) {
         response = JSON.parse(response);
         if(response.nicknameExists)
            nickname.setCustomValidity('Nickname alredy taken, please change it.');
         else
            nickname.setCustomValidity('');
      }
      ajaxRequest(url, method, queryString, async, successCallback);
   }, false);

   email.addEventListener('change', function() {
      var url = 'emailExists.php';
      var method = 'GET';
      var queryString = 'email=' + email.value;
      var async = true;
      var successCallback = function(response) {
         response = JSON.parse(response);
         if(response.emailExists)
            email.setCustomValidity('Email alredy associated with another account, please change it.');
         else
            email.setCustomValidity('');
      }
      ajaxRequest(url, method, queryString, async, successCallback);
   }, false);
}