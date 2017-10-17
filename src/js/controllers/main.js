angular
  .module('app')
  .controller('MainCtrl', MainCtrl);

// Main controller checks if user is logged in and is current user
MainCtrl.$inject = ['$rootScope', '$state', '$auth'];
funtion MainCtrl($rootScope, $state, $auth){
  const vm = this;

  $rootScope.$on('$stateChangeSuccess', () => {
    if(vm.stateHasChanged) vm.message = null;
    if (!vm.stateHasChanged) vm.stateHasChanged = true;
    vm.isNavCollapsed = true;
  })
}
