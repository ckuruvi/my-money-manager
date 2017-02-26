myApp.controller('LoginController', LoginController);

function LoginController($http, $location) {
  //console.log('LoginController loaded');
  var ctrl = this;
  // login function to authenticate user
  ctrl.login = function() {
    //console.log('logging in');
    $http.post('/login', {
      username: ctrl.username,
      password: ctrl.password
    }).then(function(response){
      //console.log('response after authentication::',response);
      $location.path('/home');
    }, function(error) {
      console.log('error logging in', error);
    });
  }; // end of login function
}
