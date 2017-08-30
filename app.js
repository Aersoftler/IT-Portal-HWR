/**
 * Startdatei des NodeJS-Servers
 */

const express = require("express");
const app = express();
const path = require("path");
const mongoUtils = require("./utils/mongodb_utils");

const staticPath = __dirname + "/client";

const picPath = __dirname + "/pics"; //Pfad zu Bildern

const programPath = __dirname + "/program"; //Pfad zu herunterladbaren Dateien

/**
 * Startseite
 */
app.get("/", function (req, res) {
    res.sendFile(path.join(staticPath, "home.html"));
});

/**
 * Detailseite
 */
app.get("/detail/:software", function (req, res) {
    res.sendFile(path.join(staticPath, "detail.html"))
});

/**
 * alle Desktop - Programme
 */
app.get("/desktopApp", function (req, res) {
    mongoUtils.getSoftwareByType("desktop", function (result) {
        res.send(result)
    });
});

/**
 * alle Embedded - Programme
 */
app.get("/embeddedApp", function (req, res) {
    mongoUtils.getSoftwareByType("embedded", function (result) {
        res.send(result)
    });
});

/**
 * alle Apps
 */
app.get("/mobileApp", function (req, res) {
    mongoUtils.getSoftwareByType("mobile", function (result) {
        res.send(result)
    });
});

/**
 * alle Webseiten
 */
app.get("/website", function (req, res) {
    mongoUtils.getSoftwareByType("website", function (result) {
        res.send(result)
    });
});

/**
 * passende Anwednung an den Client
 */
app.get("/software/:name", function (req, res) {
    mongoUtils.getSoftwareByName(req.params.name, function (result) {
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
    mongoUtils.getAllSoftware(function (result) {
        res.send(result);
    });
});

app.use(express.static(staticPath));
app.listen(3000);
console.log("Server ist gestartet (localhost:3000)");