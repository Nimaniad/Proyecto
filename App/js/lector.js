function feedeReader(param) {

    var doc = new XMLHttpRequest();

    doc.open("GET", "lector.js", false);
    doc.send();
    xmlDatos = doc.responseXML;

    var strbuffer = "";

    title = xmlDatos.getElementsByTagName("title")[0].innerHTML;
    description = xmlDatos.getElementsByTagName("description")[0].innerHTML;

    strBuffer = strBuffer + "<h1>" + title + "</h1>";
    strBuffer = strBuffer + "<div class='description'>" + description + "</div><hr>";

    var x = doc.getElementsByTagName("item");
    for (i = 0; i < x.length; i++) {
        title = x[i].getElementsByTagName("title")[0].childNodes[0].nodeValue;
        description = x[i].getElementsByTagName("description")[0].childNodes[0].nodeValue.substring(0, 180);

        strBuffer = strBuffer + "<h2>" + title + "</h2>";
        strBuffer = strBuffer + "<div class='description'>" + description + "</div>";
        if (i == 10) {
            break;
        }
    }
    document.getElementById(param).innerHTML = strBuffer;
}