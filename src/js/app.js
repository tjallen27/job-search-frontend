angular
  .module('app', ['ui.router', 'ng-resource', 'satelizer', 'checklist-model'])
  .constant('API_URL', 'http://localhost:3000')
  .filter('startFrom', function(){
    return function(data, start){
      return data.slice(start);
    };
  });
