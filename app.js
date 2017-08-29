/**
 * Startdatei des NodeJS-Servers
 */

const express = require("express");
const app = express();
const path = require("path");
const MongoClient = require('mongodb').MongoClient;

const mongoUrl = "mongodb://localhost:27017/it-portal-hwr";
const softwareCollection = "software";

const htmlPath = __dirname + "/client/html"; // Pfad zu HTML-Dateien

const picPath = __dirname + "/pics"; //Pfad zu Bildern

const programPath = __dirname + "/program"; //Pfad zu herunterladbaren Dateien

/**
 * Startseites
 */
app.get("/", function (req, res) {
    res.sendFile(path.join(htmlPath, "home.html"));
});

/**
 * Über Uns - Seite
 */
app.get("/ueber_uns", function (req, res) {
    res.sendFile(path.join(htmlPath, "ueber_uns.html"));
});

/**
 * Impressum - Seite
 */
app.get("/impressum", function (req, res) {
    res.sendFile(path.join(htmlPath, "impressum.html"));
});

/**
 * Kontakt - Seite
 */
app.get("/kontakt", function (req, res) {
    res.sendFile(path.join(htmlPath, "kontakt.html"));
});

/**
 * Footer
 */
app.get("/footer", function (req, res) {
    res.sendFile(path.join(htmlPath, "footer.html"));
});

/**
 * Header
 */
app.get("/header", function (req, res) {
    res.sendFile(path.join(htmlPath, "header.html"));
});

app.get("/suchergebnisse", function (req, res) {
    res.sendFile(path.join(htmlPath, "suchergebnisse.html"));
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
app.post("/desktopApp", function (req, res) {
    getSoftwareByType("desktop", function (result) {
        res.send(result)
    });
});

/**
 * alle Embedded - Programme
 */
app.post("/embeddedApp", function (req, res) {
    getSoftwareByType("embedded", function (result) {
        res.send(result)
    });
});

/**
 * alle Apps
 */
app.post("/mobileApp", function (req, res) {
    getSoftwareByType("mobile", function (result) {
        res.send(result)
    });
});

/**
 * alle Webseiten
 */
app.post("/website", function (req, res) {
    getSoftwareByType("website", function (result) {
        res.send(result)
    });
});

/**
 * @param Typ der Anwendung
 * @param Name der Anwendung
 * Detail - Seite
 */
app.get("/details/:typ/:name", function (req, res) {
    res.sendFile(path.join(htmlPath, "details.html"));
});

/**
 * passende Anwednung an den Client
 */
app.post("/details/:typ/:name", function (req, res) {
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
    res.sendFile(path.join(htmlPath, "uebersicht.html"));
});

/**
 * Wenn eine leere Suche gestartet wird
 * Übersichtsseite
 */
app.get("/uebersicht", function (req, res) {
    res.sendFile(path.join(htmlPath, "uebersicht.html"));
});

/**
 * alle Anwendungen
 */
app.get("/allProducts", function (req, res) {
    getAllSoftware(function (result) {
        res.send(result);
    });
});

app.use(express.static(__dirname + "/client"));
app.listen(3000);
console.log("Server ist gestartet (localhost:3000)");