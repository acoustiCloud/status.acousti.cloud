// Get data counts from audioBlast API and populate table
var url = "https://api.audioblast.org/standalone/data/fetch_data_counts/";
var xhr = new XMLHttpRequest();
xhr.open("GET", url, true);
xhr.onreadystatechange = function() {
  if (xhr.readyState == 4) {
    var resp = JSON.parse(xhr.responseText);
    document.getElementById("data-counts-recordings").innerHTML = resp.data.counts.recordings;
    document.getElementById("data-counts-annotations").innerHTML = resp.data.counts.annomate;
    document.getElementById("data-counts-taxa").innerHTML = resp.data.counts.taxa;
    document.getElementById("data-counts-traits").innerHTML = resp.data.counts.traits;
  }
}
xhr.send();

// Get analysis counts from audioBlast API and populate table
var url = "https://api.audioblast.org/standalone/analysis/fetch_analysis_counts/";
var xhr2 = new XMLHttpRequest();
xhr2.open("GET", url, true);
xhr2.onreadystatechange = function() {
  if (xhr2.readyState == 4) {
    var resp = JSON.parse(xhr2.responseText);
    document.getElementById("analysis-counts-aci").innerHTML = resp.data.counts["analysis-aci"];
    document.getElementById("analysis-counts-adi").innerHTML = resp.data.counts["analysis-adi"];
    document.getElementById("analysis-counts-bedoya").innerHTML = resp.data.counts["analysis-bedoya"];
    document.getElementById("analysis-counts-bi").innerHTML = resp.data.counts["analysis-bi"];
    document.getElementById("analysis-counts-evenness").innerHTML = resp.data.counts["analysis-evenness"];
    document.getElementById("analysis-counts-H").innerHTML = resp.data.counts["analysis-H"];
    document.getElementById("analysis-counts-M").innerHTML = resp.data.counts["analysis-M"];
    document.getElementById("analysis-counts-ndsi").innerHTML = resp.data.counts["analysis-ndsi"];
    document.getElementById("analysis-counts-sh").innerHTML = resp.data.counts["analysis-sh"];
    document.getElementById("analysis-counts-tdsc").innerHTML = resp.data.counts["analysis_3sec-tdsc"];
    document.getElementById("analysis-counts-th").innerHTML = resp.data.counts["analysis-th"];
    document.getElementById("analysis-counts-birdnet-embeddings").innerHTML = resp.data.counts["analysis_3sec-birdnet_default_embed"];
    document.getElementById("analysis-counts-birdnet-default").innerHTML = resp.data.counts["d_3sec-birdnet_default-selection"];
    document.getElementById("analysis-counts-birdnet-latlon").innerHTML = resp.data.counts["d_3sec-birdnet_latlon-selection"];
  }
}
xhr2.send();

// Get number of analysis agents from audioBlast API and populate
var url = "https://api.audioblast.org/standalone/analysis/analysis_agents/";
var xhr3 = new XMLHttpRequest();
xhr3.open("GET", url, true);
xhr3.onreadystatechange = function() {
  if (xhr3.readyState == 4) {
    var resp = JSON.parse(xhr3.responseText);
    document.getElementById("analysis-agents").innerHTML = resp.data.agents.total;
  }
}
xhr3.send();

//Get number of assigned tasks and outstanding tasks from audioBlast API and populate
var url = "https://api.audioblast.org/standalone/analysis/fetch_analysis_status/?cache=0";
var xhr4 = new XMLHttpRequest();
xhr4.open("GET", url, true);
xhr4.onreadystatechange = function() {
  if (xhr4.readyState == 4) {
    var resp = JSON.parse(xhr4.responseText);
    document.getElementById("assigned-tasks").innerHTML = resp.data.counts.assigned;
    document.getElementById("outstanding-tasks").innerHTML = resp.data.counts.waiting;
  }
}
xhr4.send();

//Ping vocab server to see if it's alive
var url = "https://vocab.audioblast.org/ping";
var xhr5 = new XMLHttpRequest();
xhr5.open("GET", url, true);
xhr5.onreadystatechange = function() {
  if (xhr5.readyState == 4) {
    if (xhr5.responseText == "pong") {
      document.getElementById("vocab-server-web-status").innerHTML = "OK";
    } else {
      document.getElementById("vocab-server-web-status").innerHTML = "ERROR";
    }
  }
}
xhr5.send();

//Ping audioblast server to see if it's alive
var url = "https://audioblast.org/index.php?page=ping";
var xhr6 = new XMLHttpRequest();
xhr6.open("GET", url, true);
xhr6.onreadystatechange = function() {
  if (xhr6.readyState == 4) {
    if (xhr6.responseText == "pong") {
      document.getElementById("audioblast-web-status").innerHTML = "OK";
    } else {
      document.getElementById("audioblast-web-status").innerHTML = "ERROR";
    }
  }
}
xhr6.send();

//Ping audioblast-dev server to see if it's alive
var url = "https://ab.acousti.cloud/index.php?page=ping";
var xhr7 = new XMLHttpRequest();
xhr7.open("GET", url, true);
xhr7.onreadystatechange = function() {
  if (xhr7.readyState == 4) {
    if (xhr7.responseText == "pong") {
      document.getElementById("audioblast-dev-web-status").innerHTML = "OK";
    } else {
      document.getElementById("audioblast-dev-web-status").innerHTML = "ERROR";
    }
  }
}
xhr7.send();

//Ping api audioblast webserver
var url = "https://api.audioblast.org/ping";
var xhr8 = new XMLHttpRequest();
xhr8.open("GET", url, true);
xhr8.onreadystatechange = function() {
  if (xhr8.readyState == 4) {
    if (xhr8.responseText == "pong") {
      document.getElementById("api-web-status").innerHTML = "OK";
    } else {
      document.getElementById("api-web-status").innerHTML = "ERROR";
    }
  }
}
xhr8.send();


//Ping cdn audioblast webserver
var url = "https://cdn.audioblast.org/index.php?page=ping";
var xhr9 = new XMLHttpRequest();
xhr9.open("GET", url, true);
xhr9.onreadystatechange = function() {
  if (xhr9.readyState == 4) {
    if (xhr9.responseText == "pong") {
      document.getElementById("cdn-web-status").innerHTML = "OK";
    } else {
      document.getElementById("cdn-web-status").innerHTML = "ERROR";
    }
  }
}
xhr9.send();

//Ping view audioblast webserver
var url = "https://view.audioblast.org/index.php?page=ping";
var xhr10 = new XMLHttpRequest();
xhr10.open("GET", url, true);
xhr10.onreadystatechange = function() {
  if (xhr10.readyState == 4) {
    if (xhr10.responseText == "pong") {
      document.getElementById("view-web-status").innerHTML = "OK";
    } else {
      document.getElementById("view-web-status").innerHTML = "ERROR";
    }
  }
}
xhr10.send();

//Ping api audioblast webserver for database
var url = "https://api.audioblast.org/dbping";
var xhr11 = new XMLHttpRequest();
xhr11.open("GET", url, true);
xhr11.onreadystatechange = function() {
  if (xhr11.readyState == 4) {
    if (xhr11.responseText.startsWith("Database connection failed:")) {
      document.getElementById("api-db-status").innerHTML = "ERROR";
    } else {
      document.getElementById("api-db-status").innerHTML = "OK";
    }
  }
}
xhr11.send();

//Ping api audioblast webserver for database
var url = "https://vocab.audioblast.org/dbping";
var xhr12 = new XMLHttpRequest();
xhr12.open("GET", url, true);
xhr12.onreadystatechange = function() {
  if (xhr12.readyState == 4) {
    if (xhr12.responseText.startsWith("Database connection failed:")) {
      document.getElementById("vocab-server-db-status").innerHTML = "ERROR";
    } else {
      document.getElementById("vocab-server-db-status").innerHTML = "OK";
    }
  }
}
xhr12.send();