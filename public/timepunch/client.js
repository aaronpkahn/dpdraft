$(document).ready(function () {
	$('#log').html('welcome to timepunch');
	
	var nav = function(showElement){
		$('#container > div').hide();
		$(showElement).show();
	};
	nav('#navPanel');
	
	$('#navhome').click(function(){
		nav('#navPanel');
	});
	
	$('#navpunch').click(function(){
		nav('#punchPanel');
	});
	
	$('#navlog').click(function(){
		nav('#logPanel');
	});
});