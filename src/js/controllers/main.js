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

  $rootScope.$on('$stateChangeSuccess', () => {
    if(vm.stateHasChanged) vm.message = null;
    if(!vm.stateHasChanged) vm.stateHasChanged = true;
    if($auth.getPayload()) vm.currentUser = $auth.getPayload();
  });

  const protectedStates = ['postsNew', 'postsEdit'];

  $rootScope.$on('$stateChangeStart', (e, start) => {
    if(($auth.isAuthenticated() && protectedStates.includes(toState.name))) {
      e.preventDefault();
      $state.go('login');
      vm.message = 'You must be logged in to see this page!';
    }
    vm.pageName = toState.name;
  });

  function logout(){
    $auth.logout();
    $state.go('home');
  }
  vm.logout = logout;
}
