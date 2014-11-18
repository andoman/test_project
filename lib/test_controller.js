angular.module('test_controller',['test_db'])
.controller('dataHandler',['dataGetter', '$scope',function(dataGetter, $scope) {
var t = this;
	callLoadData = function()
	{
		dataGetter.loadData().then(function(response){
			t.arr=response.data;
		});
	};
	
	this.load=function()
	{
		callLoadData();
	};
	
	this.reset=function()
	{
		t.name='';
		t.done=false;
		t.desc='';
		t.id='';
	};
	
	this.addNew=function()
	{
		var issue = {'name':t.name, 'desc':t.desc, 'done': t.done};
		dataGetter.addNewIssue(issue).then(function(response){
			callLoadData();
		});
	};
	
	this.saveIssue=function()
	{
		var issue = {'name':t.name, 'desc':t.desc, 'done':(t.done ? 1 : 0), 'id':t.id};
		console.log(issue)
		dataGetter.saveIssue(issue).then(function(response){
			callLoadData();
		});
	};
	
	this.remove=function(id)
	{
		dataGetter.removeIssue(id).then(function(response){
			callLoadData();
		});
	};
	
	this.showData=function(id)
	{
		angular.forEach(t.arr,function(value, key)
		{
			if(value.id==id)
			{
				console.log(value);
				t.name=value.name;
				t.desc=value.desc;
				t.id=value.id;
				t.done=value.done=='1';
			}
			return true;
		});
	};
	$scope.$watch('data.name',function(a,b){
		if(typeof a== 'undefined' || a=='')
		{
			t.error=true;
			$('#name').parent().parent().addClass('has-error has-feedback');
		}
		else
			{
				t.error=false;
				$('#name').parent().parent().removeClass('has-error has-feedback');
			}
	});
	$scope.$watch('data.desc',function(a,b){
		if(typeof a== 'undefined' || a=='')
		{
			t.error=true;
			$('#desc').parent().parent().addClass('has-error has-feedback');
		}
		else
			{
				t.error=false;
				$('#desc').parent().parent().removeClass('has-error has-feedback');
			}
	});
	callLoadData();
}]);