function showFooter() {
    document.getElementById("foo").innerHTML = "<div><div class=\"container\"><hr></div><p class=\"col-sm-offset-2 col-sm-8\" style=\"text-align: center\"><a href=\"ueber_uns\">Über uns</a><a href=\"kontakt\" style=\"padding-right: 15vw; padding-left: 15vw\">Kontakt</a><a href=\"impressum\">Impressum</a></p></div>";
}

function showHeader() {
    document.getElementById("header").innerHTML =
        "<nav class='navbar navbar-default navbar-fixed-top\'><div class='container navcon'><div class='nav navbar-nav navbar-left'><a class='navbar-brand' href='#'><img src='/images/ITPlattformLogo.png' alt=''></a></div><div class='nav navbar-nav navbar-right'> <a class = 'navbar-brand' href='http://www.hwr-berlin.de/home/'><img class='fit' src='/images/HWRLogo.jpg' alt=''></a></div><form class='navbar-form navbar' role='search'><div class='input-group'><input type='text' class='form-control' placeholder='Suche' name='suche'><div class='input-group-btn'><button class='btn btn-default' type='submit'><i class='glyphicon glyphicon-search'></i></button></div></div></form></div></nav>"
}