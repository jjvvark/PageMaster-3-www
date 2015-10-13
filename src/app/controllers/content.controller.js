(function(){

'use strict';

angular.module('app').controller('contentController', ['$scope', 'hosts', 'data', function($scope, hosts, data){

	$scope.disabled = false;

	$scope.host = hosts.current;
	$scope.$watch( 'host', function(newV, oldV){

		if( newV.value === null ) {
			return;
		}

		$scope.scheme = $scope.host.value.scheme;
		$scope.name = $scope.host.value.host;
		$scope.tld = $scope.host.value.tld;
		$scope.port = $scope.host.value.port;

	}, true );

	$scope.changeScheme = function(){

		if( $scope.host.value.scheme != $scope.scheme ) {

			$scope.disabled = true;

			data.updateData($scope.host.value, 'scheme', $scope.scheme).then( function(data){
				hosts.replace(data.newHost, data.oldHost);
			}, function(response){
				console.log("error", response);
				$scope.scheme = $scope.host.value.scheme;
			} ).finally( function(){
				$scope.disabled = false;
			} );

		}

	};

	$scope.enter = function($event){
		if($event.charCode === 13) {
			$event.target.blur();
		}
	};

	$scope.changeName = function(){

		if( $scope.host.value.host != $scope.name ) {

			$scope.disabled = true;

			data.updateData($scope.host.value, 'host', $scope.name).then( function(data){
				hosts.replace(data.newHost, data.oldHost);
			}, function(response){
				console.log("error", response);
				$scope.name = $scope.host.value.host;
			} ).finally( function(){
				$scope.disabled = false;
			} );

		}

	};

	$scope.changePort = function(){

		if( $scope.host.value.port != $scope.port ) {

			$scope.disabled = true;

			data.updateData($scope.host.value, 'port', $scope.port).then( function(data){
				hosts.replace(data.newHost, data.oldHost);
			}, function(response){
				console.log("error", response);
				$scope.port = $scope.host.value.port;
			} ).finally( function(){
				$scope.disabled = false;
			} );

		}

	};

}]);

})();