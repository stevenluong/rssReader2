var http = require('http');
//var io = require('socket.io');
var request = require('request');
var FeedParser = require('feedparser');
var COMMON = require('./common.js');
var kue = require('kue')
, queue = kue.createQueue({
    redis:{
        host: 'redis',
    }
});
var CronJob = require('cron').CronJob;
new CronJob('0 * * * * *', function() {
      console.log('You will see this message every second');
      process();
}, null, true);

//var config = require('./config.json');

var server = http.createServer();
//server.listen(3030);
//var socket = io.listen(server);
var minutes = 15;
//DEV
var server_url = "slapps.fr";
var server_port = "3000";
var news_path = '/news.json';
var sources_path = '/sources.json';
//PROD
/*
   var server_url = "slapps.fr/apollo/ror";
   var server_port = "80";
   var news_path = '/apollo/ror/news.json';
   var sources_path = '/apollo/ror/sources.json';
   */
var now = new Date();
var nNow = normalizeDate(now);
var before = now;
before.setMinutes(now.getMinutes()-minutes);
var nLast = normalizeDate(before);
console.log(nNow);
console.log(nLast);

// READ RSS
// TODO rework ? 
function process(){
console.log('http://'+server_url+':'+server_port+sources_path)
http.get('http://'+server_url+':'+server_port+sources_path, (res) => {
        var body = '';
        res.on('data', function(chunk){
            body += chunk;
        });
        res.on('end', function(){
            var sources = JSON.parse(body);
            readAll(sources);
        });
        }).on('error', (e) => {
    console.log(`Got error: ${e.message}`);
});
}

function readAll(sources){
    sources.forEach(function(source){
        readRSS(source.name,source.rss_url);
    });
};
function readRSS(sourceName,sourceLink){
    var feedparser = new FeedParser();
    var req = request(sourceLink);
    //req.on('error', done);
    req.on('response', function (res) {
        var stream = this;
        if (res.statusCode != 200) return this.emit('error', new Error('Bad status code'));
        stream.pipe(feedparser);
    });
    feedparser.on('error', function(data){
        console.log(this);
        console.log(data);
    });
    //feedparser.on('end', done);
    feedparser.on('readable', function() {
        var item;
        while (item = this.read()) {
            var nDate = normalizeDate(item.pubDate);
            var date = item.pubDate;
            console.log(date);
            //if(nDate < nLast)
            //    continue;
            var img = "";
            if(item.enclosures[0]!=undefined){
                img = item.enclosures[0].url;
            };
            var getImageLink = function(field,start,end){
                var n = field.indexOf(start);
                var tmp = item.description.substring(n+start.length);
                var m = tmp.indexOf(end);
                var img = tmp.substring(0,m);
                //console.log(sourceName+' - '+img);
                return img;
            }
            if(sourceName=="The Verge") {
                img=getImageLink(item.description,'src="','"');
            }
            if(sourceName=="Korben") {
                img=getImageLink(item.description,'src="','"');
            }
            if(sourceName=="BBC") {
                img=item.image.url;
            }
            if(sourceName=="LifeHacker") {
                img=getImageLink(item.description,'<img src="','" />');
            }
            if(sourceName=="JDG") {
                img=getImageLink(item.description,'src="','"');
            }

            var key = nDate+':'+sourceName;
            console.log(key);
            //TODO kue
            var data = {
                news: {
                    guid: key,
                    title: normalize(item.title),
                    link: item.link,
                    image_link: img,
                    date: date,
                    source: sourceName
                        //TODO description: normalize(title) 
                }
            };

            queue.create('news',data.news).save();
            //TODO STRAIGHT UPDATE OF CLIENT
        };
    });
};
queue.process('news', function(job, done){
    console.log(job.data);
    COMMON.ror_post(job.data,"slapps.fr","3000","/news.json",function(res){
        //console.log(res);
        done();
    });
});
function normalizeDate(date){
    var year = date.getFullYear();
    var month = ("0" + (date.getMonth() + 1)).slice(-2);
    var day = ("0" + date.getDate()).slice(-2);
    var hours = ("0" + date.getHours()).slice(-2);
    var minutes = ("0" + date.getMinutes()).slice(-2);
    var seconds = ("0" + date.getSeconds()).slice(-2);
    var milli = ("00"+date.getMilliseconds()).slice(-3);
    return parseInt(year+month+day+hours+minutes+seconds+milli);
};
/*
   function done(err){
   if(err){
   console.log("SL error");
   console.log(err,err.stack);
   return process.exit(1);
   }
//server.close();
//process.exit();
}
*/
// UPDATE CLIENTS
/*
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
});

});
*/
function normalize(title){
    var space = title.toLowerCase().replace(/[ç]/g,"c").replace(/[üùû]/g,"u").replace(/[îï]/g,"i").replace(/[àâ]/g,"a").replace(/[öô]/g,"o").replace(/[œ]/g,"oe").replace(/[€ëéèê]/g,"e").replace(/[^a-zA-Z0-9]/g," ");
    return space; 
}

