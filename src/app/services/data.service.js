(function(){

'user strict';

angular.module('app').service('data', ['$q', '$http', function($q, $http){

	var self = this;

	self.getData = function(){

		var defer = $q.defer();

		$http.post( '/data', {'type':'init'} ).then( function(response){
			defer.resolve( response.data );
		}, function(response){
			defer.reject( response );
		} );

		return defer.promise;

	};

	self.updateData = function(host, field, value) {

		var defer = $q.defer();

		$http.post( '/data', {'type':'update', 'host':JSON.stringify(host), 'field':field, 'value':value} ).then( function(response){
			defer.resolve( response.data );
		}, function(response){
			defer.reject( response );
		} );

		return defer.promise;

	};

}]);

})();