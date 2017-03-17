/**
 * Datei, in der alles um die Urls definiert ist
 */
const detailUrl = "/details";
const desktopUrl = "/desktopApp";
const mobileAppUrl = "/mobileApp";
const embeddedAppUrl = "/embeddedApp";
const websiteUrl = "/website";
const detailDesktopAppUrl = detailUrl + desktopUrl;
const detailMobileAppUrl = detailUrl + mobileAppUrl;
const detailEmbeddedAppUrl = detailUrl + embeddedAppUrl;
const detailWebsiteUrl = detailUrl + websiteUrl;
const picUrl = "/pic";

function buildLogoUrl(app) {
    return picUrl + '/' + app.name + '/' + app.logo;
}