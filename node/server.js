var http = require('http');
var io = require('socket.io');
var request = require('request');
var FeedParser = require('feedparser');

var config = require('./config.json');

var server = http.createServer();
server.listen(3030);
var socket = io.listen(server);


// READ RSS
// TODO get sources from ROR
http.get('http://localhost:3000/sources.json', (res) => {
		var body = '';
		res.on('data', function(chunk){
			body += chunk;
		});
		res.on('end', function(){
			var sources = JSON.parse(body);
			console.log(sources);
			main(sources);
		});
		//var sources = config.sources;
		//console.log(res);
		//res.resume();
		}).on('error', (e) => {
	console.log(`Got error: ${e.message}`);
});
function main(sources){
	readAll(sources);
	setInterval(function(){
		console.log('Read-'+parseDate(new Date))
			readAll(sources);
	},30*1000);
}

function readAll(sources){
	//console.log('Reading RSS ...');
	sources.forEach(function(source){
		readRSS(source.name,source.rss_url);
	});
};
function readRSS(sourceName,sourceLink){
	console.log(sourceLink);
	console.log(sourceName);
	var feedparser = new FeedParser();
	var req = request(sourceLink);
	req.on('error', done);
	req.on('response', function (res) {
		var stream = this;
		if (res.statusCode != 200) return this.emit('error', new Error('Bad status code'));
		stream.pipe(feedparser);
	});
	feedparser.on('error', done);
	feedparser.on('end', done);
	var counter = 1;
	feedparser.on('readable', function() {
		var item;
		while (item = this.read()) {
			var newDate = parseDate(item.pubDate);
			var img = "";
			if(item.enclosures[0]!=undefined){
				img = item.enclosures[0].url;
			};
			var rssitem = {guid:item.guid,title:item.title,link:item.link,date:newDate,source:sourceName, img:img, description:item.description};
			var key = 'items:'+newDate+':'+sourceName;
			//console.log(key);
			//console.log(rssitem);
			//console.log(item);
			ror_post(rssitem);
			//TODO STRAIGHT UPDATE OF CLIENT
			//socket.emit('item',rssitem);
		};
	});
};

function parseDate(date){
	var year = date.getFullYear();
	var month = ("0" + (date.getMonth() + 1)).slice(-2);
	var day = ("0" + date.getDate()).slice(-2);
	var hours = ("0" + date.getHours()).slice(-2);
	var minutes = ("0" + date.getMinutes()).slice(-2);
	var seconds = ("0" + date.getSeconds()).slice(-2);
	var milli = date.getMilliseconds();
	return year+month+day+hours+minutes+seconds+milli;
};

function done(err){
	if(err){
		console.log(err,err.stack);
		return process.exit(1);
	}
	//server.close();
	//process.exit();
}
// UPDATE CLIENTS
socket.on('connection', function (socket) {
	console.log('connection');
	socket.emit('connected');

	socket.on('last items',function(){
		console.log('last items');
		var today = new Date();
		console.log(today);
		var yesterday = new Date();
		yesterday.setDate(today.getDate() -1);
		console.log(yesterday);
		//TODO update client from ROR
		/*
		   redisClient.keys('items:'+parseDate(today).substring(0,8)+'*', function(err,keys){
		//console.log(keys.length);
		redisClient.keys('items:'+parseDate(yesterday).substring(0,8)+'2*', function(err2,keys2){
		keys2.forEach(function(key){
		//console.log(key);
		redisClient.hmget(key,'date','title','link','source', 'img', function(err,values){
		socket.emit('item',{date:values[0],title:values[1],link:values[2], source:values[3], img:values[4]});
		});	
		});
		});
		keys.forEach(function(key){
		//console.log(key);
		redisClient.hmget(key,'date','title','link','source', 'img', function(err,values){
		socket.emit('item',{date:values[0],title:values[1],link:values[2], source:values[3], img:values[4]});
		});	
		});
		});
		*/
	});

});
function ror_post(news){
	//TODO normalise title (no é)
	//var rssitem = {guid:item.guid,title:item.title,link:item.link,date:newDate,source:sourceName, img:img, description:item.description};
	var title = normalize(news.title);
	var image = news.img;
	var date = news.date;
	var source = news.source;
	var data = {
		news: {
			title: normalize(title),
			image: image,
			date: date,
			source: source 
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

	http.request(options, function(res) {
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
}
function normalize(title){
	var space = title.replace(/[î]/g,"i").replace(/[à]/g,"a").replace(/[ô]/g,"o").replace(/[éèê]/g,"e").replace(/[^a-zA-Z]/g," ").toLowerCase(); 
	/*
	   var split = space.split(' '); 
	   var norm = ""; 
	   split.forEach(function(i){ 
	   if(i.length>2){ 
	   if(norm==""){ 
	   norm = i; 
	   }else{ 
	   norm = norm +" "+i; 
	   } 
	   } 
	   }); 
	   */
	return space; 
}
