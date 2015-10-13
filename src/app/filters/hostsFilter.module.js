(function(){

'require strict';

angular.module('app').filter('hostsFilter', function(){
	return function(input){
		return ((input.scheme)?'https://':'http://') + input.host + '.' + input.tld;
	};
});

})();