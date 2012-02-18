function StartChat(chatinput, chatoutput) {
	var box = PUBNUB.$(chatoutput), input = PUBNUB.$(chatinput), channel = 'dpchat';
	PUBNUB.subscribe({
		 channel  : channel,
		 callback : function(m) { box.innerHTML = (''+m.n+':'+m.msg).replace( /[<>]/g, '' ) + '<br>' + box.innerHTML; }
	});
	PUBNUB.bind( 'keyup', input, function(e) {
		 (e.keyCode || e.charCode) === 13 && PUBNUB.publish({
			  channel : channel, message : {n:'Aaron', msg:input.value}
		 });
	} );
}