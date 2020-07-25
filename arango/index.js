'use strict';
const createRouter = require('@arangodb/foxx/router');
const router = createRouter();

module.context.use(router);

router.get('/hi', function (req, res) {
  res.send('γεια');
})
.response(['text/plain'], 'Hi in greek')
.summary('Greek greeting')
.description('Prints the greek greeting.');

const joi = require('joi');
const db = require('@arangodb').db;
const aql = require('@arangodb').aql;
const errors = require('@arangodb').errors;
const newsCollection = db._collection('news');
const sourcesCollection = db._collection('sources');
const DOC_NOT_FOUND = errors.ERROR_ARANGO_DOCUMENT_NOT_FOUND.code;


router.post('/news', function (req, res) {
  const multiple = Array.isArray(req.body);
  const body = multiple ? req.body : [req.body];
  let data = [];
  for (var doc of body) {
    const meta = newsCollection.save(doc);
    data.push(Object.assign(doc, meta));
  }
  res.send(multiple ? data : data[0]);
})
.body(joi.array(),'News to store in the collection.')
.response('News stored in the collection.')
.summary('Store news')
.description('Store news');

router.put('/news', function (req, res) {
  const multiple = Array.isArray(req.body);
  const body = multiple ? req.body : [req.body];
  let data = [];
  for (var doc of body) {
    //console.log("1011");
    //console.log(doc.link.toString());
    const link = doc.link;
    const exists = db._query(aql`
      FOR n IN ${newsCollection}
      FILTER n.link == ${link}
      RETURN n
    `).toArray();
    //console.log(exists);
    if(exists.length==0){
      const meta = newsCollection.save(doc);
      //TODO CHECK IF NEWS LINK EXISTS
      data.push(Object.assign(doc, meta));
      console.log(link);
    }else{
      //console.log("DEBUG - Exists")
    }
  }
  res.send(multiple ? data : data[0]);
})
.body(joi.array(),'News to store in the collection.')
.response('News stored in the collection.')
.summary('Store news')
.description('Store news');

router.get('/news', function (req, res) {
  //FETCH 2 DAYS
  //const in = new Date();
  //in.setDate(in.getDate()-1);
  //const out = new Date();
  //FILTER DATE_TIMESTAMP(n.datetime) > DATE_TIMESTAMP(${in}) AND DATE_TIMESTAMP(n.datetime) < DATE_TIMESTAMP(${in})
  const news = db._query(aql`
    FOR n IN ${newsCollection}
    FILTER DATE_TIMESTAMP(n.datetime) > DATE_TIMESTAMP(DATE_SUBTRACT(DATE_NOW(),1,"day")) AND DATE_TIMESTAMP(n.datetime) < DATE_TIMESTAMP(DATE_NOW())
    RETURN n
  `);
  res.send(news);
})
.response(joi.array(),'List of news.')
.summary('List news')
.description('List news');


router.get('/sources', function (req, res) {
  const sources = db._query(aql`
    FOR source IN ${sourcesCollection}
    RETURN source
  `);
  res.send(sources);
})
.response(joi.array(),'List of Sources.')
.summary('List Sources')
.description('List Sources');
