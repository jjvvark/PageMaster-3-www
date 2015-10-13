(function(){

'use strict';

angular.module('app').factory('hosts', [function(){

// temp start

function dynamicSortMultiple() {
    /*
     * save the arguments object as it will be overwritten
     * note that arguments object is an array-like object
     * consisting of the names of the properties to sort by
     */
    var props = arguments;
    return function (obj1, obj2) {
        var i = 0, result = 0, numberOfProperties = props.length;
        /* try getting a different result from 0 (equal)
         * as long as we have extra properties to compare
         */
        while(result === 0 && i < numberOfProperties) {
            result = dynamicSort(props[i])(obj1, obj2);
            i++;
        }
        return result;
    }
}

function dynamicSort(property) {
    var sortOrder = 1;
    if(property[0] === "-") {
        sortOrder = -1;
        property = property.substr(1);
    }
    return function (a,b) {
        var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
        return result * sortOrder;
    }
}

// var people = [ {first: "Laura", last: "van vark"},{first: "Wouter", last: "van vark"},{first: "joost", last: "van vark"},{first: "Mathieu", last: "Prudon"},{first: "Hans", last: "Prudon"} ];
// console.log(people);

// console.log(people.sort( dynamicSortMultiple("last", "first") ));

// temp end
	
	var hosts = {
		list: [],
		current: {
			value: null
		}
	};

	var self = hosts;

	hosts.addHost = function(host){
		self.list.push(host);
	};

	hosts.clearList = function(){
		self.list.length = 0;
	};

	hosts.setList = function(data) {
		self.clearList();
		for(var i = 0; i < data.length; i++) {
			self.addHost(data[i]);
		}
		tryToSelect();
	};

	hosts.setCurrent = function(host) {

		if(self.current.value === host) {
			self.current.value = null;
		} else {
			self.current.value = host;
		}

	};

	hosts.replace = function(newHost, oldHost){

		for(var i = 0; i < self.list.length; i++) {

			if( self.list[i].scheme === oldHost.scheme && self.list[i].host === oldHost.host && self.list[i].tld === oldHost.tld ) {

				// replace
				self.list[i] = newHost;

				// maybe change selected
				if( self.current.value.scheme === oldHost.scheme && self.current.value.host === oldHost.host && self.current.value.tld === oldHost.tld ) {
					self.setCurrent(self.list[i]);
				}

				// re-sort
				self.list.sort( dynamicSortMultiple( "host", "tld", "scheme" ) );

				return true;
			}

		}

		return false;
	};

	// magic
	function tryToSelect(){

		// check length of list -> return
		if( self.list.length === 0 ) {
			console.log("length is 0");
			return;
		}

		// check if current == null -> select first
		if( self.current.value == null ) {
			console.log("current === null");
			self.setCurrent( self.list[0] );
		} else {
			for(var i = 0; i < self.list.length; i++) {
				if( compareHosts(self.current.value, self.list[i]) ) {
					console.log("The one exists");
					self.setCurrent(self.list[i]);
					return;
				}
			}
			console.log("The current one doesn't exist");
			self.setCurrent( self.list[0] );
		}

		// check if current exists -> do nothing -else-> set first
		
	}

	function compareHosts(host1, host2) {
		return host1.scheme === host2.scheme && host1.host === host2.host && host1.tld === host2.tld;
	}

	return hosts;

}])

})();