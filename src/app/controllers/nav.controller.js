(function(){

'use strict';

angular.module('app').controller( 'navController', ['data', 'hosts', function(data, hosts){

var self = this;

self.init = function(){
	data.getData().then(function(data){
		hosts.setList(data);
	}, function(response){
		console.log("error ::", response);
	});
};

}] );

})();