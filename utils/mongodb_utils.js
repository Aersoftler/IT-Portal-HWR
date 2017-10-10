const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
const fs = require('fs');
const path = require("path");

const dbName = "it-portal-hwr";
const mongoUrl = "mongodb://localhost:27017/" + dbName;
const softwareCollection = "software";

const programPath = path.join(__dirname, "..", "program");

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

function getSoftwareById(id, callback) {
    MongoClient.connect(mongoUrl, function (err, db) {
        if (err) throw err;
        db.collection(softwareCollection).find({_id: new ObjectID(id)}, {}).toArray(function (err, dbResult) {
            if (err) throw err;
            db.close();
            callback(dbResult);
        })
    })
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

function addSoftware(software, callback) {
    MongoClient.connect(mongoUrl, function (err, db) {
        if (err) throw err;
        db.collection(softwareCollection).insertOne(software, function (err) {
            if (err) throw err;
            db.close();
            callback();
        });
    });
}

function updateSoftware(software, callback) {
    MongoClient.connect(mongoUrl, function (err, db) {
        if (err) throw err;
        getSoftwareById(software._id, function (result) {
            const oldSoftware = result[0];

            function handleUpdateSoftware() {
                let numberOfFinishedDbOperations = 0;
                let insertetId;

                function callCallback() {
                    numberOfFinishedDbOperations++;
                    if (numberOfFinishedDbOperations === 2) {
                        callback(insertetId);
                    }
                }

                db.collection(softwareCollection).deleteOne({_id: new ObjectID(software._id)}, function (err) {
                    if (err) throw err;
                    db.close();
                    callCallback();
                });
                delete software.file;
                delete software._id;
                db.collection(softwareCollection).insertOne(software, function (err, result) {
                    if (err) throw err;
                    db.close();
                    insertetId = result.insertedId.toString();
                    callCallback();
                })
            }

            if (typeof software.file !== 'undefined') {
                software.file = software.file.split("base64,")[1];
                fs.writeFile(path.join(programPath, software.download[0]), software.file, 'base64');
                handleUpdateSoftware()
            } else {
                handleUpdateSoftware()
            }
            const oldFilePath = path.join(programPath, oldSoftware.download[0]);
            if (oldSoftware.download[0] !== "" && software.download[0] !== oldSoftware.download[0] && fs.existsSync(oldFilePath)) {
                fs.unlinkSync(oldFilePath);
            }
        });
    })
}

module.exports = {getSoftwareByType, getSoftwareByName, getAllSoftware, addSoftware, updateSoftware};