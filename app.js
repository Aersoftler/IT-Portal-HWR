const express = require("express");
const app = express();
const fs = require('fs');
const path = require("path");

const htmlPath = __dirname + "/client/html";
const desktopAppFile = __dirname + "/data/desktopApps.json";
const embeddedAppFile = __dirname + "/data/embeddedApps.json";
const mobileAppFile = __dirname + "/data/mobileApps.json";
const websiteFile = __dirname + "/data/websites.json";
const picPath = __dirname + "/pics";
const programPath = __dirname + "/program";

app.get("/", function (req, res) {
    res.sendFile(path.join(htmlPath, "home.html"));
});

app.get("/ueber_uns", function (req, res) {
    res.sendFile(path.join(htmlPath, "ueber_uns.html"));
});

app.get("/impressum", function (req, res) {
    res.sendFile(path.join(htmlPath, "impressum.html"));
});

app.get("/kontakt", function (req, res) {
    res.sendFile(path.join(htmlPath, "kontakt.html"));
});

app.get("/details", function (req, res) {
    res.sendFile(path.join(htmlPath, "details.html"));
});

app.get("/uebersicht", function (req, res) {
    res.sendFile(path.join(htmlPath, "uebersicht.html"));
});

app.post("/desktopApp", function (req, res) {
    res.send(readJsonFile(desktopAppFile));
});

app.post("/embeddedApp", function (req, res) {
    res.send(readJsonFile(embeddedAppFile));
});

app.post("/mobileApp", function (req, res) {
    res.send(readJsonFile(mobileAppFile));
});

app.post("/website", function (req, res) {
    res.send(readJsonFile(websiteFile));
});

app.get("/details/:typ/:name", function (req, res) {
    res.sendFile(path.join(htmlPath, "details.html"));
});

function getProduct(products, req) {
    return products.filter(function (product) {
        return product.name == req.params.name;
    });
}

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

function readJsonFile(file) {
    try {
        const data = fs.readFileSync(file);
        return JSON.parse(data);
    } catch (e) {
        console.log(file + "konnte nicht gelesen werden " + e);
        return [];
    }
}

app.get("/details/:typ/download/:name/:program", function (req, res) {
    res.sendFile(path.join(programPath, String(req.params.typ), String(req.params.name), String(req.params.program)));
});

app.get("/details/:typ/:name/:pic", function (req, res) {
    res.sendFile(path.join(picPath, String(req.params.typ), String(req.params.name), String(req.params.pic)));
});

app.post("/allProducts", function (req, res) {
    res.send(readJsonFile(desktopAppFile).concat(readJsonFile(mobileAppFile).concat(readJsonFile(embeddedAppFile).concat(readJsonFile(websiteFile)))));
});

app.use(express.static(__dirname + "/client"));
app.listen(3000);
console.log("Server ist gestartet");