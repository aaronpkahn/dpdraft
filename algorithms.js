function Hexa4()
{
	return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
}
function GUID() 
{
	return (Hexa4()+Hexa4()+Hexa4()+Hexa4()+Hexa4()+Hexa4()+Hexa4()+Hexa4()).toUpperCase();
}
function parseCommand(text) {
	//TODO: add extra whitespace parsing
	var i = text.indexOf(' ');
	if(i > 0){
		return {
			command	: text.substring(1,i)
			,args		: text.substring(i+1,text.length).split(' ')
		};
	}
	return {
		command	: text.substring(1,text.length)
		,args		: []		
	};
}
exports.GUID = GUID;
exports.parseCommand = parseCommand;