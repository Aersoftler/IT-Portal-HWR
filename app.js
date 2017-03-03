let express = require("express");
let app = express();
let fs = require('fs');
let path = require("path");

app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "client", "html", "home.html"));
});

app.get("/ueber_uns", function (req, res) {
    res.sendFile(path.join(__dirname, "client", "html", "ueber_uns.html"));
});

app.get("/impressum", function (req, res) {
    res.sendFile(path.join(__dirname, "client", "html", "impressum.html"));
});

app.get("/kontakt", function (req, res) {
    res.sendFile(path.join(__dirname, "client", "html", "kontakt.html"));
});

app.get("/details", function (req, res) {
    res.sendFile(path.join(__dirname, "client", "html", "details.html"));
});

app.use(express.static(__dirname + "/client"));
app.listen(3000);
console.log("Server ist gestartet");