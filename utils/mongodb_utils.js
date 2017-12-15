const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
const fs = require('fs');
const path = require("path");

const dbName = "it-portal-hwr";
const mongoUrl = "mongodb://localhost:27017/" + dbName;
const softwareCollection = "software";

const programPath = path.join(__dirname, "..", "program");

/**
 * return all software by type
 * @param type
 * @param callback
 */
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

/**
 * return software by name
 * @param name
 * @param callback
 */
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

/**
 * return software by id (id given by MongoDB)
 * @param id
 * @param callback
 */
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

/**
 * return all software
 * @param callback
 */
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

/**
 * adds software in db
 * @param software
 * @param callback
 */
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

/**
 * adds software by name
 * @param name
 * @param callback
 */
function addSoftwareByName(name, callback) {
    getSoftwareByName(name, function (result) {
        if (result.length !== 0) {
            callback("already existing");
        } else {
            addSoftware({
                "name": name,
                "kurzbeschreibung": "",
                "beschreibung": "",
                "logo": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAyAAAAJYCAMAAACtqHJCAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAMAUExURf///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAsjt+EAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAadEVYdFNvZnR3YXJlAFBhaW50Lk5FVCB2My41LjEwMPRyoQAAAehJREFUeF7twQENAAAAwqD3T20PBwQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA3alXBAAEdAQMaAAAAAElFTkSuQmCC",
                "screenshots": [],
                "download": [],
                "gitHub": [],
                "website": [],
                "zielgruppe": "",
                "jahrgang": "",
                "type": "default"
            }, function () {
                callback("OK");
            })
        }
    });
}

/**
 * update one software, deletes deprecated software
 * @param software complete software (how the software looks like after update)
 * @param callback
 */
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
            }
            if (oldSoftware.download.length !== 0) {
                const oldFilePath = path.join(programPath, oldSoftware.download[0]);
                if (oldSoftware.download[0] !== "" && software.download[0] !== oldSoftware.download[0] && fs.existsSync(oldFilePath)) {
                    fs.unlinkSync(oldFilePath);
                }
            }
            handleUpdateSoftware()
        });
    })
}

/**
 * delete software by name
 * @param name
 * @param callback
 */
function deleteSoftwareByName(name, callback) {
    MongoClient.connect(mongoUrl, function (err, db) {
        if (err) throw err;
        db.collection(softwareCollection).deleteOne({'name': name}, function (err) {
            if (err) throw err;
            db.close();
            callback();
        });
    });
}

module.exports = {
    getSoftwareByType,
    getSoftwareByName,
    getAllSoftware,
    addSoftwareByName,
    updateSoftware,
    deleteSoftwareByName
};