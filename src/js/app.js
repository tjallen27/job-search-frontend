angular
  .module('app', [])
  .controller('MainCtrl', MainCtrl);


// $inject prevents errors when using Gulp
MainCtrl.$inject = ['$http'];
function MainCtrl($http){
  // the 'vm' namespacing refers to the view model
  const vm = this;
  vm.all = [];

  postsIndex();

  function postsIndex(){
    // http get data from this end point
    $http.get('APIENDPOINT')
    // after data has been retreived, take the response and...
    .then((response) => {
      // console log the response
      console.log(response);
    });
  }
}
