const MongoClient = require('mongodb').MongoClient;

const mongoUrl = "mongodb://localhost:27017/it-portal-hwr";
const softwareCollection = "software";

function getSoftwareByType(type, callback) {
    MongoClient.connect(mongoUrl, function (err, db) {
        if (err) throw err;
        db.collection(softwareCollection).find({"type": type}, {}).toArray(function (err, dbResult) {
            if (err) throw err;
            db.close();
            callback(dbResult);
        });
    });
}

function getSoftwareByName(name, callback) {
    MongoClient.connect(mongoUrl, function (err, db) {
        if (err) throw err;
        db.collection(softwareCollection).find({"name": name}, {}).toArray(function (err, dbResult) {
            if (err) throw err;
            db.close();
            callback(dbResult);
        });
    });
}

function getAllSoftware(callback) {
    MongoClient.connect(mongoUrl, function (err, db) {
        if (err) throw err;
        db.collection(softwareCollection).find({}, {}).toArray(function (err, dbResult) {
            if (err) throw err;
            db.close();
            callback(dbResult);
        });
    });
}

module.exports = {getSoftwareByType, getSoftwareByName, getAllSoftware};