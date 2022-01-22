
var admin = require("firebase-admin");

var serviceAccount = require("../authentification.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

module.exports = db;