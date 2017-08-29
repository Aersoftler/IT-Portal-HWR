/**
 * Startdatei des NodeJS-Servers
 */

const express = require("express");
const app = express();
const path = require("path");
const MongoClient = require('mongodb').MongoClient;

const mongoUrl = "mongodb://localhost:27017/it-portal-hwr";
const softwareCollection = "software";

const staticPath = __dirname + "/client";

const picPath = __dirname + "/pics"; //Pfad zu Bildern

const programPath = __dirname + "/program"; //Pfad zu herunterladbaren Dateien

/**
 * Startseites
 */
app.get("/", function (req, res) {
    res.sendFile(path.join(staticPath, "home.html"));
});

app.get("/detail/:software", function (req, res) {
    res.sendFile(path.join(staticPath, "detail.html"))
});

function getSoftwareByType(type, callback) {
    MongoClient.connect(mongoUrl, function (err, db) {
        if (err) throw err;
        db.collection(softwareCollection).find({"type": type}, {"_id": false}).toArray(function (err, dbResult) {
            if (err) throw err;
            db.close();
            callback(dbResult);
        });
    });
}

function getSoftwareByName(name, callback) {
    MongoClient.connect(mongoUrl, function (err, db) {
        if (err) throw err;
        db.collection(softwareCollection).find({"name": name}, {"_id": false}).toArray(function (err, dbResult) {
            if (err) throw err;
            db.close();
            callback(dbResult);
        });
    });
}

function getAllSoftware(callback) {
    MongoClient.connect(mongoUrl, function (err, db) {
        if (err) throw err;
        db.collection(softwareCollection).find({}, {"_id": false}).toArray(function (err, dbResult) {
            if (err) throw err;
            db.close();
            callback(dbResult);
        });
    });
}

/**
 * alle Desktop - Programme
 */
app.get("/desktopApp", function (req, res) {
    getSoftwareByType("desktop", function (result) {
        res.send(result)
    });
});

/**
 * alle Embedded - Programme
 */
app.get("/embeddedApp", function (req, res) {
    getSoftwareByType("embedded", function (result) {
        res.send(result)
    });
});

/**
 * alle Apps
 */
app.get("/mobileApp", function (req, res) {
    getSoftwareByType("mobile", function (result) {
        res.send(result)
    });
});

/**
 * alle Webseiten
 */
app.get("/website", function (req, res) {
    getSoftwareByType("website", function (result) {
        res.send(result)
    });
});

/**
 * passende Anwednung an den Client
 */
app.get("/software/:name", function (req, res) {
    getSoftwareByName(req.params.name, function (result) {
        res.send(result);
    });
});

/**
 * Datei zum herunterladen
 */
app.get("/download/:download", function (req, res) {
    res.sendFile(path.join(programPath, String(req.params.download)));
});

/**
 * passendes Bild
 */
app.get("/pic/:name/:pic", function (req, res) {
    res.sendFile(path.join(picPath, String(req.params.name), String(req.params.pic)));
});

/**
 * Übersichtsseite
 */
app.get("/uebersicht/:search", function (req, res) {
    sendUebersicht(res);
});

/**
 * Wenn eine leere Suche gestartet wird
 * Übersichtsseite
 */
app.get("/uebersicht", function (req, res) {
    sendUebersicht(res);
});

function sendUebersicht(res) {
    res.sendFile(path.join(staticPath, "uebersicht.html"));
}

/**
 * alle Anwendungen
 */
app.get("/allProducts", function (req, res) {
    getAllSoftware(function (result) {
        res.send(result);
    });
});

app.use(express.static(staticPath));
app.listen(3000);
console.log("Server ist gestartet (localhost:3000)");