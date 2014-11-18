angular.module("test_db", [],function($httpProvider)
{
	$httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
 
	/**
	* The workhorse; converts an object to x-www-form-urlencoded serialization.
	* @param {Object} obj
	* @return {String}
	*/ 
	var param = function(obj) {
	var query = '', name, value, fullSubName, subName, subValue, innerObj, i;
	  
	for(name in obj) {
	  value = obj[name];
		
	  if(value instanceof Array) {
		for(i=0; i<value.length; ++i) {
		  subValue = value[i];
		  fullSubName = name + '[' + i + ']';
		  innerObj = {};
		  innerObj[fullSubName] = subValue;
		  query += param(innerObj) + '&';
		}
	  }
	  else if(value instanceof Object) {
		for(subName in value) {
		  subValue = value[subName];
		  fullSubName = name + '[' + subName + ']';
		  innerObj = {};
		  innerObj[fullSubName] = subValue;
		  query += param(innerObj) + '&';
		}
	  }
	  else if(value !== undefined && value !== null)
		query += encodeURIComponent(name) + '=' + encodeURIComponent(value) + '&';
	}
	  
	return query.length ? query.substr(0, query.length - 1) : query;
	};

	// Override $http service's default transformRequest
	$httpProvider.defaults.transformRequest = [function(data) {
	return angular.isObject(data) && String(data) !== '[object File]' ? param(data) : data;
	}];
}).factory('dataGetter',['$http',function($http){
	var loadData = function(){
		return $http.get('request.php').success(function(response) {return response;});
	};
	//
	var addNewIssue = function(issue){
		return $http.post('request.php',{'data':JSON.stringify(issue)}).success(function(response) {return response;});
	};
	var saveIssue = function(issue){
		return $http.post('request.php',{'data':JSON.stringify(issue)}).success(function(response) {return response;});
	};
	var removeIssue = function(id){
		return $http.post('request.php',{'del':id}).success(function(response) {return response;});
	};

	
	return {loadData:loadData, addNewIssue:addNewIssue, removeIssue:removeIssue, saveIssue:saveIssue};
}]);
