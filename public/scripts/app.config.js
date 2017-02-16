// routing
// angular
//   .module("passportApp")
  myApp.config(function($routeProvider, $locationProvider,ChartJsProvider) {
    $locationProvider.html5Mode(true);
    ChartJsProvider.setOptions({
      responsive: false
    });

    $routeProvider
      .when("/home", {
        templateUrl: "views/home.html",
        controller: "HomeController as home",
        authRequired: true
      })
      .when("/newUser", {
        templateUrl: "views/register.html",
        controller: "RegisterController as register"
      })
      .when("/income", {
        templateUrl: "views/income.html",
        controller: "IncomeController as income"
      })
      .when("/expense", {
        templateUrl: "views/expense.html",
        controller: "ExpenseController as expense"
      })
      .when("/investments", {
        templateUrl: "views/investments.html",
        controller: "InvestmentsController as investments"
      })
      .when("/charts", {
        templateUrl: "views/charts.html",
        controller: "ChartsController as charts"
      })
      .otherwise({
        templateUrl: "views/login.html",
        controller: "LoginController as login"
      });
  })
  // .config(['ChartJsProvider', function (ChartJsProvider) {
  //           // Configure all charts
  //           ChartJsProvider.setOptions({
  //             responsive: false
  //           });
  //         }])
  .run(function($rootScope, $location, $route, AuthService) {
    $rootScope.$on("$routeChangeStart", function(event, next, current) {
      AuthService.checkLoginStatus().then(function(loggedIn) {
        console.log('event ::',event);
          console.log('next ::',next);
        console.log(loggedIn);
        console.log('next.authRequired',next.authRequired );
        if (next.authRequired && !loggedIn) {
          $location.path("/login");
          $route.reload();
        }
      });
    });
  });
