angular
  .module('app', ['ui.router', 'ngResource', 'satellizer', 'checklist-model', 'ui.bootstrap', 'ngAnimate', 'ngMessages'])
  .constant('API_URL', 'http://localhost:3000');
