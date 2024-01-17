const { MongoClient } = require("mongodb");
const Db = process.env.ATLAS_URI;
const client = new MongoClient(Db);
var _db;

module.exports = {
  connectToServer: async function (callback) {
    try {
      await client.connect();
	  console.log("Connected successfully to server");
      _db = client.db("kms");
      // Verify we got a good "db" object
    } catch (err) {
      return callback(err);
    }
  },
  getDb: function () {
    return _db;
  }
};
