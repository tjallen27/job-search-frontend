angular
  .module('app')
  .controller('MainCtrl', MainCtrl);

// Main controller checks if user is logged in and is current user
MainCtrl.$inject = ['$rootScope', '$state', '$auth'];
funtion MainCtrl($rootScope, $state, $auth){
  const vm = this;

 // $rootScope is a parent object of all $scope Angular objects created in a web page
  $rootScope.$on('$stateChangeSuccess', () => {
    if(vm.stateHasChanged) vm.message = null;
    if (!vm.stateHasChanged) vm.stateHasChanged = true;
    vm.isNavCollapsed = true;
  });;

  vm.isAuthenticated = $auth.isAuthenticated;

  // If there are any errors...
  $rootScope.$on('error', (e, err)=>{
    // ...change to the state to false
    vm.stateHasChanged = false;
    // store error message
    vm.message = err.data.message;
    // redirect to 'login' page
    $state.go('login');
  });

}
