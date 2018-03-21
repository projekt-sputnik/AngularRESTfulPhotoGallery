(function() {
    "use strict";

    angular
        .module('app')
        .config(function($stateProvider, $urlRouterProvider, $locationProvider) {

            $urlRouterProvider.otherwise('/users');
            $locationProvider.hashPrefix('');
            // $locationProvider.html5Mode(true);


            $stateProvider
                .state('users', {
                    url: '/users',
                    templateUrl: 'users.html',
                    controller: 'UsersCtrl',
                    controllerAs: 'users'
                })

        });
})();
