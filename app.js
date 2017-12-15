/**
 * Startdatei des NodeJS-Servers
 */

// Initial things
const express = require("express");
const app = express();
const path = require("path");
const fs = require("fs");
const md5 = require("md5");
const auth = require('express-basic-auth');
const bodyParser = require('body-parser');
const http = require('http');
const https = require('https');
const forceSsl = require('express-force-ssl');
app.use(forceSsl);
const mongoUtils = require("./utils/mongodb_utils");

const staticPath = __dirname + "/client";
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
    mongoUtils.getSoftwareByType("Desktop-Anwendung", function (result) {
        res.send(result)
    });
});

/**
 * alle Embedded - Programme
 */
app.get("/embeddedApp", function (req, res) {
    mongoUtils.getSoftwareByType("Embedded-Software", function (result) {
        res.send(result)
    });
});

/**
 * alle Apps
 */
app.get("/mobileApp", function (req, res) {
    mongoUtils.getSoftwareByType("App", function (result) {
        res.send(result)
    });
});

/**
 * alle Webseiten
 */
app.get("/website", function (req, res) {
    mongoUtils.getSoftwareByType("Website", function (result) {
        res.send(result)
    });
});

/**
 *
 */
app.get("/default", function (req, res) {
    mongoUtils.getSoftwareByType("default", function (result) {
        res.send(result)
    });
});

/**
 * passende Anwednung an den Client
 */
app.get("/products/:name", function (req, res) {
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
app.get("/products", function (req, res) {
    mongoUtils.getAllSoftware(function (result) {
        res.send(result);
    });
});

// initial basic auth
app.use(express.static(staticPath));
const authentication = auth({
    authorizer: handleAuth,
    challenge: true
});

function handleAuth(user, pass) {
    return user === "hwr" && md5(pass) === "1beae8ab50b47674f134976c589879b4";
}

/**
 * Update-Seite (Übersicht)
 */
app.get("/update/", authentication, function (req, res) {
    res.sendFile(path.join(staticPath, "update.html"));
});

/**
 * Update-Seite einer speziellen Software
 */
app.get("/update/:software", authentication, function (req, res) {
    res.sendFile(path.join(staticPath, "update_software.html"));
});

/**
 * delete software by name
 */
app.delete("/products/:software", authentication, function (req, res) {
    mongoUtils.deleteSoftwareByName(req.params.software, function () {
        res.send("OK");
    })
});

/**
 * insert software by name
 */
app.post("/products/:software", authentication, function (req, res) {
    mongoUtils.addSoftwareByName(req.params.software, function (message) {
        if (message === "OK") {
            res.send(message);
        } else if (message === "already existing") {
            res.status(409);
            res.send(message);
        }
    })
});

// initial bodyParser
app.use(bodyParser.urlencoded({
    extended: false,
    limit: '1000gb'
}));
app.use(bodyParser.json({limit: '1000gb'}));

/**
 * update software
 */
app.patch("/products/:name", function (req, res) {
    mongoUtils.updateSoftware(req.body, function (productId) {
        res.send(productId)
    });
});

// initial TLS / SSL
const key = fs.readFileSync('certs/itphwr.key');
const cert = fs.readFileSync('certs/itphwr.crt');
const ca = fs.readFileSync('certs/itphwr.crt');

const options = {
    key: key,
    cert: cert,
    ca: ca
};

// start Server
https.createServer(options, app).listen(443);
http.createServer(app).listen(80);

console.log("Server gestartet: https://localhost");