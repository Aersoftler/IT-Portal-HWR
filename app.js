/**
 * Startdatei des NodeJS-Servers
 */

const express = require("express");
const app = express();
const fs = require('fs');
const path = require("path");

const htmlPath = __dirname + "/client/html"; // Pfad zu HTML-Dateien

//Pfade zu JSON-Dateien
const desktopAppFile = __dirname + "/data/desktopApps.json";
const embeddedAppFile = __dirname + "/data/embeddedApps.json";
const mobileAppFile = __dirname + "/data/mobileApps.json";
const websiteFile = __dirname + "/data/websites.json";

const picPath = __dirname + "/pics"; //Pfad zu Bildern

const programPath = __dirname + "/program"; //Pfad zu herunterladbaren Dateien

/**
 * @send Startseites
 */
app.get("/", function (req, res) {
    res.sendFile(path.join(htmlPath, "home.html"));
});

/**
 * @send Über Uns - Seite
 */
app.get("/ueber_uns", function (req, res) {
    res.sendFile(path.join(htmlPath, "ueber_uns.html"));
});

/**
 * @send Impressum - Seite
 */
app.get("/impressum", function (req, res) {
    res.sendFile(path.join(htmlPath, "impressum.html"));
});

/**
 * @send Kontakt - Seite
 */
app.get("/kontakt", function (req, res) {
    res.sendFile(path.join(htmlPath, "kontakt.html"));
});

/**
 * @send Footer
 */
app.get("/footer", function (req, res) {
    res.sendFile(path.join(htmlPath, "footer.html"));
});

/**
 * @send Header
 */
app.get("/header", function (req, res) {
    res.sendFile(path.join(htmlPath, "header.html"));
});

/**
 * @send alle Desktop - Programme
 */
app.post("/desktopApp", function (req, res) {
    res.send(readJsonFile(desktopAppFile));
});

/**
 * @send alle Embedded - Programme
 */
app.post("/embeddedApp", function (req, res) {
    res.send(readJsonFile(embeddedAppFile));
});

/**
 * @send alle Apps
 */
app.post("/mobileApp", function (req, res) {
    res.send(readJsonFile(mobileAppFile));
});

/**
 * @send alle Webseiten
 */
app.post("/website", function (req, res) {
    res.send(readJsonFile(websiteFile));
});

/**
 * @param Typ der Anwendung
 * @param Name der Anwendung
 * @send Detail - Seite
 */
app.get("/details/:typ/:name", function (req, res) {
    res.sendFile(path.join(htmlPath, "details.html"));
});

/**
 * @return Anwendung, welche den Namen hat, der aufgerufen werden soll
 */
function getProduct(products, req) {
    return products.filter(function (product) {
        return product.name == req.params.name;
    });
}

/**
 * @send passende Anwednung zum Client
 */
app.post("/details/:typ/:name", function (req, res) {
    if (req.params.typ == "desktopApp") {
        const apps = readJsonFile(desktopAppFile);
        res.send(getProduct(apps, req));
    }
    if (req.params.typ == "embeddedApp") {
        const apps = readJsonFile(embeddedAppFile);
        res.send(getProduct(apps, req));
    }
    if (req.params.typ == "mobileApp") {
        const apps = readJsonFile(mobileAppFile);
        res.send(getProduct(apps, req));
    }
    if (req.params.typ == "website") {
        const sites = readJsonFile(websiteFile);
        res.send(getProduct(sites, req));
    }
});

/**
 * @param file, aus der gelesen werden soll
 * @return Daten als Array
 */
function readJsonFile(file) {
    try {
        const data = fs.readFileSync(file);
        return JSON.parse(data);
    } catch (e) {
        console.log(file + "konnte nicht gelesen werden " + e);
        return [];
    }
}

/**
 * @send Datei zum herunterladen
 */
app.get("/download/:download", function (req, res) {
    res.sendFile(path.join(programPath, String(req.params.download)));
});

/**
 * @send passendes Bild
 */
app.get("/pic/:name/:pic", function (req, res) {
    res.sendFile(path.join(picPath, String(req.params.name), String(req.params.pic)));
});

/**
 * @send Übersichtsseite
 */
app.get("/uebersicht/:search", function (req, res) {
    res.sendFile(path.join(htmlPath, "uebersicht.html"));
});

/**
 * Wenn eine leere Suche gestartet wird
 * @send Übersichtsseite
 */
app.get("/uebersicht", function (req, res) {
    res.sendFile(path.join(htmlPath, "uebersicht.html"));
});

/**
 * @return alle JSON als ein Array
 */
function getAllProducts() {
    return readJsonFile(desktopAppFile).concat(readJsonFile(mobileAppFile).concat(readJsonFile(embeddedAppFile).concat(readJsonFile(websiteFile))));
}

/**
 * @send alle Anwendungen
 */
app.get("/allProducts", function (req, res) {
    res.send(getAllProducts());
});

app.use(express.static(__dirname + "/client"));
app.listen(3000);
console.log("Server ist gestartet");