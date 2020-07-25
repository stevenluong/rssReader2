// continued
'use strict';
const db = require('@arangodb').db;
const newsCollection = 'news';
const sourcesCollection = 'sources';

if (!db._collection(newsCollection)) {
  db._createDocumentCollection(newsCollection);
}

if (!db._collection(sourcesCollection)) {
  db._createDocumentCollection(sourcesCollection);
}
