$(document).ready(function () {
	function showLoading() {
		$('#login').hide();
		$('#chat').hide();
		$('#loading').show();
	}
	function showLogin(msg) {
		$('#loading').hide();
		$('#chat').hide();
		$('#name').val('');
		$('#login').show();
		if(msg){
			$('#name').attr('placeholder', msg);
		}
	}
	function showChat() {
		$('#loading').hide();
		$('#chat').show();
		$('#chatinput').focus();
	}
	showLoading();
	
	//setup server connection
	var server;
	var client; 
	DNode({
		raiseError	: function (m) {
			$('#log').prepend('<span class="error">'+m+'</span><br/>');
		}
		,log	: function (m) {
			$('#log').prepend('<span class="logmsg">'+m+'</span><br/>');
		}
		,hear	: function (n,m) {
			m = m.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
			$('#log').prepend('<b>'+n+':</b> '+m+'<br />');
		}
		,logout : function() {
			showLogin('logged out... enter name');
		}
		,receivePacks : function(packs) {
			$('#log').prepend('<span class="logmsg">joined draft '+packs.length+' packs</span><br/>');
			$('#packs').html('');
			for(p in packs){
				$('#packs').append('<div id="pack'+p+'" class="pack">&nbsp;___<br/>| '+p+' |<br/>|___|</div>');
				var cardlist = [];
				for(c in packs[p]){
					cardlist.push(packs[p][c].Name);
				}
				var packtext = 'pack '+p+': '+cardlist.join(', ');
				$('#pack'+p).click(function(){
					alert(packtext);					
				});
			}
		}
	}).connect(function (s) {
		server = s;
		client = this;
		showLogin();
	});
	
	//login event
	$('#name').keydown(function(e) {
		if((e.keyCode || e.charCode) === 13 && $('#name').val()) {
			var name = $('#name').val();
			if(name.indexOf(' ') >=0 ) {
				showLogin('enter a name without spaces');
				return;
			}
			if(!name.match('^[a-zA-Z0-9]*$')) {
				showLogin('enter a name with valid characters');
				return;
			}
			$('#login').hide();
			$('#loading').show();
			server.login(name,function(error){
				if(error){
					showLogin(error);
				} else {
					client.name = name;
					showChat();
				}
			}); //just a callback
		}
	});
	
	//chat interaction
	var inputBuffer = [];
	var currentIndex = -1;
	$('#chatinput').keydown(function(e) {
		if((e.keyCode || e.charCode) === 38) { //up
			if(inputBuffer.length-1>currentIndex){
				$('#chatinput').val(inputBuffer[++currentIndex]);
			}
		} else if((e.keyCode || e.charCode) === 40) { //down
			if(currentIndex>0){
				$('#chatinput').val(inputBuffer[--currentIndex]);
			} else if(currentIndex == 0){
				$('#chatinput').val('');
			}
		}
		else if((e.keyCode || e.charCode) === 13) { //enter
			currentindex = -1;
			inputBuffer.splice(0,0, $('#chatinput').val());
			server.say(fixStr($('#chatinput').val())); //no callback
			$('#chatinput').val('');
		}
	});
	function fixStr(str){
		var retStr = str.replace(/google/ig, 'bing');
		retStr = retStr.replace(/apple/ig, 'google');
		retStr = retStr.replace(/microsoft/ig, 'm$');
		retStr = retStr.replace(/lol/ig, '101');		
		return retStr;
	}
});