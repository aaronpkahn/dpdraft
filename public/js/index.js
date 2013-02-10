$(document).ready(function () {
	
	showLoading();
	var templates = {
		'pack':'/public/tmpl/pack.tmpl.html'
		//,'other':'/public/test2.tmpl.html'
	};
	loadTemplates(templates); //calls finishLoading() once all templates are loaded
});

function appendToLog(msg) {
	$('#log').append(msg);
	$('#log').scrollTop($('#log')[0].scrollHeight);
}

function FinishLoading(sid) {
	//setup server connection
	var server;
	var client; 
	DNode({
		raiseError : function (m) {
			appendToLog('<span class="error">'+m+'</span><br/>');
		}
		,log : function (m) {
			appendToLog('<span class="logmsg">'+m+'</span><br/>');
		}
		,hear : function (n,m) {
			m = m.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
			appendToLog('<b>'+n+':</b> '+m+'<br />');
		}
		,logout : function() {
			showLogin('logged out... enter name');
		}
		,receivePacks 	: function(packs) {
			appendToLog('<span class="logmsg">joined draft '+packs.length+' packs</span><br/>');
			$('#packs').html('');
			for(p in packs){
				var cardlist = [];
				for(c in packs[p]){
					cardlist.push(packs[p][c].Name);
				}
				var txt = '<div id="dpack'+p+'" title="Pack '+p+'"><p>'+cardlist.join(', ')+'</p></div>';
				$('#container').prepend(txt);
				$('#dpack'+p).dialog({autoOpen:false});
				$.tmpl('pack', {id:p}).appendTo('#packs');
				//.append('<div id="pack'+p+'" class="pack" >&nbsp;___<br/>| '+p+' |<br/>|___|</div>');
				$('#pack'+p).click(function(sender){
					var pid = sender.currentTarget.id;
					$('#d'+pid).dialog('open');
				});
			}
		}
		,tron : function() {
			window.open('/public/tron.html','tron','width=350,height=300,scrollbars=no');
		}
	}).connect(function (s) {
		server = s;
		client = this;
		server.setupClient(sid, function(userInfo) {
			$('#loginDetails').html(userInfo.name);
			showMain();
		});
	});
	
	// //login event no longer needed with oauth
	// $('#name').keydown(function(e) {
		// if((e.keyCode || e.charCode) === 13 && $('#name').val()) {
			// var name = $('#name').val();
			// if(name.indexOf(' ') >=0 ) {
				// showLogin('enter a name without spaces');
				// return;
			// }
			// if(!name.match('^[a-zA-Z0-9]*$')) {
				// showLogin('enter a name with valid characters');
				// return;
			// }
			// showLoading();
			// server.login(name,function(error){
				// if(error){
					// showLogin(error);
				// } else {
					// client.name = name;
					// showMain();
				// }
			// }); //just a callback
		// }
	// });
	
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
}

function loadTemplates(templates){
	var templateCount = Object.keys(templates).length;
	var loadedCount = 0;
	for(t in templates) {
		loadTemplate(t, templates[t], function() { 
			loadedCount += 1;
			if(loadedCount == templateCount) {
				GetSession();
			}
		});
	}
}

function GetSession(){
	$.get('/sid'
		,function(data){
			FinishLoading(data);
		}
	);
}

function loadTemplate(name, templateUrl, cb) { //this may be called by loadTemplates at the first page load, or later
	$.ajax({
		url:templateUrl
		,success: function(template) {
			$.template(name, template);
			cb();
		}
		,error: function(jqXHR, textStatus, errorThrown) {
			showError(textStatus+errorThrown);
		}
	});
}

function showError(msg) {
	$('#container').prepend('<div id="error" class="error">'+msg+'</div>');
}
function showLoading() {
	$('#container > div').hide();
	$('#loading').show();
}
function showLogin(msg) {
	//window.location = '/public/auth.html';
	// $('#container > div').hide();
	// $('#login').show();
	// $('#name').val('');
	// if(msg){
		// $('#name').attr('placeholder', msg);
	// }
}
function showMain() {
	$('#container > div').hide();
	$('#main').show();
	$('#chatinput').focus();
	$('#loading').hide();
}