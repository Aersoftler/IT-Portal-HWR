function search() {
    console.log($("#searchField")[0].value);
    window.location.href = "/uebersicht/" + $("#searchField")[0].value;
}