angular
  .module('app', ['ui.router', 'ng-resource', 'satellizer', 'checklist-model', 'ui.bootstrap', 'ngAnimate', 'ngMessages'])
  .constant('API_URL', 'http://localhost:3000')
  .filter('startFrom', function(){
    return function(data, start){
      return data.slice(start);
    };
  });
