;(function(){
  'use strict';

  var app = angular.module('ui.router.rerouter',['ui.router']);
  
  app.factory('$reroute',["$state",'$rootScope',function($state,$rootScope){

    /**
     * Navigates to a state based on the value provided
     * @param  {String|Function} arg1 The name of state or a callback to call. The callback function can return the state name as a string.
     * @return {void}
     */
    function redirect(arg1) {
      // Handle a string
      if(angular.isString(arg1)){
        $state.go(arg1)
        return;
      }

      // Handle a function
      if(angular.isFunction(arg1)){
        var state = arg1();

        // If a string was returned do some recursion
        if(angular.isDefined(state)){
          redirect(state);
        }
        return;
      }
    }

  	return {

      /**
       * Creates an event listener for redirection from a specific state
       * @param  {[type]}          baseState The state to redirect from
       * @param  {String|Function} cb        The state to redirect to. Can be a string or callback function.
       * @return {Function}                  The event binding on the $rootScope
       */
  		onChange: function(baseState, cb){
  			
        //Immediately redirect
        if ($state.is(baseState)){
          redirect(cb);
        }

  			return $rootScope.$on('$stateChangeStart',function (event, toState){
  				if ($state.is(baseState) || (toState && toState.name == baseState)){
  					if(event !== undefined){
  						event.preventDefault();
  					}
  					redirect(cb);
  				}
  			});
  		}
  	};
  }]);
})();
