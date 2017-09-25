var http = require('http');
module.exports = {
	exemple: function(){
		var data ={
			transaction: {
				field1: "value1",
				field2: "value2",
			}};
		ror_post(data,"slapps.fr","/APP/ror/OBJECTS.json",function(res){
			console.log(res);
		});
	},
	ror_post: function(data,host,port,path,callback){
		var dataStr = JSON.stringify(data);
                console.log(dataStr);
		var options = {
			host: host,
			port: port,
			path: path,
			method: 'PUT',
			headers: {
				'Content-Length': dataStr.length,
				'Content-Type': 'application/json'
			}
		};
		var str = '';

		var req = http.request(options, function(res) {
			res.setEncoding('utf8');
			res.on('data', function(data) {
				str += data;
			});

			res.on('end', function() {
				//console.log(str);
				callback(str);
			})

			res.on('error', function(error) {
				//console.log(error);
			})
		})
		req.on('error',function(e){
			console.log(e);
			console.log("SLerror");
		});
		req.end(dataStr);

	}
}
