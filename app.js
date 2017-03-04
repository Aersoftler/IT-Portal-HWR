let express = require("express");
let app = express();
let fs = require('fs');
let path = require("path");

let htmlPath = __dirname + "/client/html";
let desktopAppFile = __dirname + "/data/desktopApps.json";
let picPath = __dirname + "/pics";
let programPath = __dirname + "/program";

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

// app.get("/desktopApp", function (req, res) {
//     res.send(readJsonFile(desktopAppFile));
// });
//
// app.get("/desktopApp/:applikation", function (req, res) {
//     let apps = readJsonFile(desktopAppFile);
//     res.send(apps.filter(function (app) {
//         return app.name == req.params.applikation
//     }));
// });

app.get("/details/:typ/:applikation", function (req, res) {
    res.sendFile(path.join(htmlPath, "details.html"));
});

app.post("/details/:typ/:applikation", function (req, res) {
    if (req.params.typ == "desktopApp") {
        let apps = readJsonFile(desktopAppFile);
        res.send(apps.filter(function (app) {
            return app.name == req.params.applikation;
        }));
    }
});

function readJsonFile(file) {
    try {
        let data = fs.readFileSync(file);
        return JSON.parse(data);
    } catch (e) {
        console.log(file + "konnte nicht gelesen werden " + e);
        return [];
    }
}

app.get("/details/:typ/download/:applikation/:program", function (req, res) {
    res.sendFile(path.join(programPath, String(req.params.typ), String(req.params.applikation), String(req.params.program)));
});

app.get("/details/:typ/:applikation/:pic", function (req, res) {
    res.sendFile(path.join(picPath, String(req.params.typ), String(req.params.applikation), String(req.params.pic)));
});

app.use(express.static(__dirname + "/client"));
app.listen(3000);
console.log("Server ist gestartet");