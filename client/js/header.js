/**
 * wird aufgerufen, wenn jmd etwas suchen möchte
 */
function search() {
    window.location.href = "/uebersicht/" + $("#searchField")[0].value;
}