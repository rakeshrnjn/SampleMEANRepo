const http = require('http');

const hostName = '127.0.0.1'; 
const port = 3000;

// const server = http.createServer((req, res) => {
//   res.statusCode = 200;
//   res.setHeader('Content-Type', 'text/plain');
//   res.end('' + global);
  
// });

// server.listen(port, hostName, () => {
//   console.log(`Server running at http://${hostName}:${port}/`);
// });


/* OS Module*/
// const os = require('os');
// let totalM = os.totalmem();
// let freeM = os.freemem();

// console.log(`Total Memory: ${totalM} and Free Mrmory: ${freeM}`);

/** File System Module */
const fs = require('fs');

var MongoClient = require('mongodb').MongoClient
 , assert = require('assert');

// Connection URL
var url = 'mongodb://localhost:27017/';

/** Creating Database */
// MongoClient.connect(url, function(err, db) {
//     if (err) throw err;
//     console.log("Database created!");
//     db.close();
//   });

/** Creating Collection */

// MongoClient.connect(url, function(err, db) {
//     if (err) throw err;
//     const dbo = db.db('myproject');
//     dbo.createCollection("customers", function(err, res) {
//       if (err) throw err;
//       console.log("Collection created!");
//       db.close();
//     });
// });

  
// // Use connect method to connect to the Server
MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);
  console.log("Connected correctly to server");
  const dbo = db.db('myproject');
  // Insert a single document
  dbo.collection('inserts').insertOne({a:1}, function(err, r) {
    assert.equal(null, err);
    assert.equal(1, r.insertedCount);

    // Insert multiple documents
    dbo.collection('inserts').insertMany([{a:2}, {a:3}], function(err, r) {
      assert.equal(null, err);
      assert.equal(2, r.insertedCount);

      db.close();
    });
  });
});

