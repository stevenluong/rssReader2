//TODO requires
var request = require('request');
var FeedParser = require('feedparser');
var CronJob = require('cron').CronJob;
//TODO vars
var server_host= "athena.slapps.fr";
var protocol= "https";
//var server_host= "apollo_loopback_1";
//var server_port = "3000";
var news_path = '/_db/production/apollo/news';
var sources_path = '/_db/production/apollo/sources';
//TODO MAIN
var cronJob = new CronJob({
    cronTime: '0 0 * * * *',
    onTick: function() {
        process();
    }
});
cronJob.start();
//MAIN
var process = function(){
  //console.log("DEBUG")
    getSources(function(sources){
        console.log(sources);
        sources.map(source => {
            getNewTitles(source.rss_url,source.name,function(titles){
                //console.log(source.name);
                //console.log(titles);
                putTitles(titles);
            });
        });
    });
};
process();
var date = new Date();
var testTitle = {
    //guid: normalizeDate(date)+":JDG",
    title: "tot",
    link: "a",
    image_link: "a",
    datetime: date,
    source: "JDG"
}
/*
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
*/
//TODO PUT a title
var putTitles = function(titles){
    //request.put("http://"+server_host+":"+server_port+news_path,title,function(error,response,body){
    request.put({url:protocol+"://"+server_host+news_path,json:titles},function(error,response,body){
        console.log("DEBUG");
        if (!error && response.statusCode == 200) {
            //console.log("error ON ");
            //console.log(body);
        }else{
            //console.log(body);
            console.log("DEBUG - DONE");
            //console.log(error);
        }
    })
}
//TODO TEST
//putTitle(title);
//GET ALL SOURCES
function getSources(callback){
    request.get(protocol+"://"+server_host+sources_path,function(error,response,body){
        if (!error && response.statusCode == 200) {
            var sources = JSON.parse(body);
            console.log(sources[0])
            callback(sources);
        }else{
            console.log(error);
        }
    })
}
//TODO OPTI GET all news
var getNewTitles = function(sourceLink, sourceName,callback){
    var titles=[];
    var feedparser = new FeedParser();
    var req = request(sourceLink);
    req.on('error', ()=>{

        console.log("error ON ");
        console.log(sourceLink);
    });
    req.on('response', function (res) {
        var stream = this;
        if (res.statusCode != 200) return this.emit('error', new Error('Bad status code'));
        stream.pipe(feedparser);
    });
    feedparser.on('error', function(data){
        //console.log(this);
        console.log(data);
        console.log("feedparser-error");
    });
    feedparser.on('end', function(){
        callback(titles);
    })
    feedparser.on('readable', function() {
        var item;
        while (item = this.read()) {
            //TODO filter items
            titles.push(read(sourceName,item));
        };
    });

}
//SPECIFIC
function read(sourceName,item){
    //console.log("date:"+item.pubDate);
    //console.log("title:"+item.title);
    var date = item.pubDate;
    if(sourceName=="LeParisien")
        date=new Date();
    //console.log(sourceName)
    //var nDate = normalizeDate(date);
    var img = "";
    if(item.enclosures[0]!=undefined){
        img = item.enclosures[0].url;
    };
    if(sourceName=="ABC"){
        img=item.image.url;
        //console.log(img);
        //if(img==""){
        //  console.log(item);
        //}
    }

    if(sourceName=="The Verge")
        img=getImageLink(item,'src="','"');
    if(sourceName=="Korben")
        img=getImageLink(item,'src="','"');
    if(sourceName=="BBC")
        img="https://news.bbcimg.co.uk/nol/shared/img/bbc_news_120x60.gif";
    if(sourceName=="LifeHacker")
        img=getImageLink(item,'<img src="','" />');
    if(sourceName=="JDG")
        img=getImageLink(item,'src="','"');

    //var key = nDate+':'+sourceName;
    return {
        //guid: key,
        title: normalize(item.title),
        link: item.link,
        image_link: img,
        datetime: date,
        source: sourceName
    }
};
function getImageLink(item,start,end){
    var field = item.description;
    var n = field.indexOf(start);
    var tmp = item.description.substring(n+start.length);
    var m = tmp.indexOf(end);
    var img = tmp.substring(0,m);
    return img;
}
function normalize(title){
    var space = title.toLowerCase().replace(/[ç]/g,"c").replace(/[üùû]/g,"u").replace(/[îï]/g,"i").replace(/[àâ]/g,"a").replace(/[öô]/g,"o").replace(/[œ]/g,"oe").replace(/[€ëéèê]/g,"e").replace(/[^a-zA-Z0-9]/g," ");
    return space;
}

//var sourceLink = "http://www.challenges.fr/rss.xml";
//var sourceName = "TEST";
//getNewTitles();
