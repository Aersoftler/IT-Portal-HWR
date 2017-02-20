/**
 * Created by dgolla on 19.02.2017.
 */

//Wird aufgerufen, wenn die Seite fertig geladen hat
window.onload = function () {
    load();
    showFooter();
};

//Wird aufgerufen, wenn sich die Auflösung der Seite verändert hat
window.onresize = function () {
    load();
};

//Wird genutzt, um die Seite korrekt anzuzeigen
function load() {
    var width = window.innerWidth;
    for (i = 0; i < 4; i++) {
        var itemId = "item" + i;
        document.getElementById(itemId).style.height = (width / 5) < 200 ? "200px" : (width / 5) + "px";
    }
}