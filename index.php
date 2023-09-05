<html>
<head>
  <title>Status</title>
</head>
<body>
<script>
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
      document.getElementById("analysis-counts-tdsc").innerHTML = resp.data.counts["analysis-tdsc"];
      document.getElementById("analysis-counts-th").innerHTML = resp.data.counts["analysis-th"];
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
  var url = "https://api.audioblast.org/standalone/analysis/fetch_analysis_status/";
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

</script>
</body>

<h1>Status</h1>
<div id="data-counts">
  <table>
    <thead>
      <tr>
        <th>Data type</th>
        <th>Count</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Recordings</td>
        <td id="data-counts-recordings"></td>
      </tr>
      <tr>
        <td>Annotations</td>
        <td id="data-counts-annotations"></td>
      </tr>
      <tr>
        <td>Taxa</td>
        <td id="data-counts-taxa"></td>
      </tr>
      <tr>
        <td>Traits</td>
        <td id="data-counts-traits"></td>
      </tr>
  </table>
</div>

<div id="analysis-counts">
  <table>
    <thead>
      <tr>
        <th>Analysis type</th>
        <th>Count</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>ACI</td>
        <td id="analysis-counts-aci"></td>
      </tr>
      <tr>
        <td>ADI</td>
        <td id="analysis-counts-adi"></td>
      </tr>
      <tr>
        <td>Bedoya</td>
        <td id="analysis-counts-bedoya"></td>
      </tr>
      <tr>
        <td>BI</td>
        <td id="analysis-counts-bi"></td>
      </tr>
      <tr>
        <td>Acoustic evenness</td>
        <td id="analysis-counts-evenness"></td>
      </tr>
      <tr>
        <td>H</td>
        <td id="analysis-counts-H"></td>
      </tr>
      <tr>
        <td>M</td>
        <td id="analysis-counts-M"></td>
      </tr>
      <tr>
        <td>NDSI</td>
        <td id="analysis-counts-ndsi"></td>
      </tr>
      <tr>
        <td>SH</td>
        <td id="analysis-counts-sh"></td>
      </tr>
      <tr>
        <td>TDSC</td>
        <td id="analysis-counts-tdsc"></td>
      </tr>
      <tr>
        <td>TH</td>
        <td id="analysis-counts-th"></td>
      </tr>
  </table>

  <table>
    <thead>
      <tr>
        <th>Tasks</th>
        <th>Count</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Analysis agents</td>
        <td id="analysis-agents"></td>
      </tr>
      <tr>
        <td>Assigned tasks</td>
        <td id="assigned-tasks"></td>
      </tr>
      <tr>
        <td>Outstanding tasks</td>
        <td id="outstanding-tasks"></td>
      </tr>
  </table>