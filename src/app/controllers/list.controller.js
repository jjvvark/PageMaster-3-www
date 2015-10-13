(function(){

'use strict';

angular.module('app').controller('listController', ['hosts', function(hosts){

	var self = this;

	self.hosts = hosts.list;
	self.current = hosts.current;

	self.setHost = function(host){
		console.log("hoi");
		hosts.setCurrent(host);
	};

	self.isHost = function(host){
		return host===self.current.value;
	};

}]);

})();