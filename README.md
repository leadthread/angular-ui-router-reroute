# angular-ui-router-reroute

This package solves the problem of having a parent state that needs to automatically redirect to a child state.

For instance consider this structure:
```
- page
	- create
	- edit
	- view
```

When ever you navigate to `#/page` you would like it to default to the create child state `#/page/create`.
Because you have to pass a callback as the second param you can do more advanced redirections such as sending an unauthenticated user to `#/page/view/1` instead of `#/page/create`. Whatever you want :P

## Installation
Bower
`bower install angular-ui-router-reroute --save`

NPM
`npm install angular-ui-router-reroute --save`

## Usage
Declare the module as a dependency
```js
var app = angular.module('app',[
	'ui.router',
	'ui.router.reroute'
]);
```

In your controller for a particular state, inject the `$reroute` service.
```js
app.controller('PageController',['$state','$reroute',function($state,$reroute){
	/**
	 * param1: The name of the state that this controller belongs to
	 * param2: The redirect callback
	 */
	$reroute.onChange('page',function(){
		$state.go('page.create');
	})
}]);
```