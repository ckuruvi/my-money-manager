myApp.controller('RegisterController', function($http, $location){
  var ctrl = this;
  // function to register new user
  ctrl.register = function() {
    //console.log('creating a new user');
    $http.post('/register', {
      username:ctrl.username,
      password:ctrl.password,
      firstname:ctrl.firstname,
      lastname:ctrl.lastname
    }).then(function(response){
      $location.path('/home');
    }, function(error) {
      console.log('error registering new user', error);
    });
  }; // end of register function
});
