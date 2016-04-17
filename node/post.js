var http = require('http');
var data = {
	news: {
		title: 'title',
		image: 'image',
		date: '201604050800',
		source: 'source'
	}
};

var dataStr = JSON.stringify(data);
var options = {
	host: 'localhost',
	path: '/news.json',
	port: '3000',
	method: 'POST',
	headers: {
		'Content-Length': dataStr.length,
		'Content-Type': 'application/json'
	}
};
var str = '';

http
.request(options, function(res) {
	res.setEncoding('utf8');
	res.on('data', function(data) {
		str += data;
	});

	res.on('end', function() {
		console.log(str);
	})

	res.on('error', function(error) {
		console.log(error);
	})
})
.end(dataStr);
