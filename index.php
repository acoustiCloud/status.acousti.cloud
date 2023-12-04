<!doctype html>
<html lang="en">
<head>
  <title>status.acousti.cloud</title>
  <meta charset="utf-8">
  <meta name="description" content="Status of the acousti.cloud services">
  <meta name="author" content="Ed Baker">
</head>
<body>

<h1>Status</h1>
<p>This page shows the operational status of the bioacoustic and ecoacoustic services that form the audioBlast ecosystem.</p>

<table>
    <thead>
      <tr>
        <th>Service</th>
        <th>Status</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>api.audioblast.org (web)</td>
        <td id="api-web-status"></td>
      </tr>
      <tr>
        <td>api.audioblast.org (database)</td>
        <td id="api-db-status"></td>
      </tr>
      <tr>
        <td>audioblast.org (web)</td>
        <td id="audioblast-web-status"></td>
      </tr>
      <tr>
        <td>audioblast.org-dev [ab.acousti.cloud] (web)</td>
        <td id="audioblast-dev-web-status"></td>
      </tr>
      <tr>
        <td>cdn.audioblast.org (web)</td>
        <td id="cdn-web-status"></td>
      </tr>
      <tr>
        <td>view.audioblast.org (web)</td>
        <td id="view-web-status"></td>
      </tr>
      <tr>
        <td>vocab.audioblast.org (web)</td>
        <td id="vocab-server-web-status"></td>
      </tr>
      <tr>
        <td>vocab.audioblast.org (database)</td>
        <td id="vocab-server-db-status"></td>
      </tr>
  </table>

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
        <td>BirdNET embeddings</td>
        <td id="analysis-counts-birdnet-embeddings"></td>
      </tr>
      <tr>
        <td>BirdNET default IDs</td>
        <td id="analysis-counts-birdnet-default"></td>
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

  <small>Author: <a href="https://ebaker.me.uk">Ed Baker</a></small>
  <script src="status.js"></script>
</body>
</html>