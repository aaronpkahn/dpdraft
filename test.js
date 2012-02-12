// var i = 5;
// console.log("num:"+(i/2|0));
var newO = {
	a:	[], 
	b: 	"cool",
	c:	function(){
			runz(this.a);
			//console.log(typeof this.a['127.0.0.1']);
			// var ip = '127.0.0.1';
			// if(typeof this.a[ip] === 'undefined' || this.a[ip] === null)
				// console.log("missing");
			// {
				// this.a["1"] = "tite";
				// console.log(this.a["1"]);
			// } else
			// {
				// console.log("null");
			// }
			
		}
};

function runz(a){
	 a[0] = [];
	 a[0][0] = {Name:"cool"};
	 a[0][1] = {Name:"other"};
}

newO.c();
for(item in newO.a[0])
console.log(newO.a[0][0].Name);