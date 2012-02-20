function Hexa4()
{
	return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
}
function GenerateGuid() 
{
	return (Hexa4()+Hexa4()+Hexa4()+Hexa4()+Hexa4()+Hexa4()+Hexa4()+Hexa4()).toUpperCase();
}
exports.GUID = GenerateGuid();