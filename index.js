;(function(){
  'use strict';

  var app = angular.module('ui-router.rerouter',['ui-router']);
  
  app.factory('$reroute',["$state",'$rootScope',function($state,$rootScope){
  	return {
  		onChange: function(baseState, cb){
  			cb();
  			return $rootScope.$on('$stateChangeStart',function (event, toState){
  				if ($state.is(baseState) || (toState && toState.name == baseState)){
  					if(event !== undefined){
  						event.preventDefault();
  					}
  					console.log('In The Factory.');
  					cb();
  				}
  			});
  		}
  	};
  }]);
})();
