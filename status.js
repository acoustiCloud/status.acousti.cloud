//Checks whether the audioBlast services are up, and shows counts of the data, analyses and tasks in audioBlast.
//The checks run in the visitor's browser when the page opens, and again whenever the button is pressed.
(function () {
  "use strict";

  //How long to wait for each reply before treating the request as failed
  var TIMEOUT_SECONDS = 10;

  //Each service's card on the page, the address that is checked, and how to check it
  var services = [
    {id: "api-web-status", url: "https://api.audioblast.org/ping", check: ping},
    {id: "api-db-status", url: "https://api.audioblast.org/dbping", check: dbping},
    {id: "audioblast-web-status", url: "https://audioblast.org/index.php?page=ping", check: ping},
    {id: "audioblast-dev-web-status", url: "https://ab.acousti.cloud/index.php?page=ping", check: ping},
    {id: "cdn-web-status", url: "https://cdn.audioblast.org/index.php?page=ping", check: ping},
    {id: "view-web-status", url: "https://view.audioblast.org/index.php?page=ping", check: ping},
    {id: "vocab-server-web-status", url: "https://vocab.audioblast.org/ping", check: ping},
    {id: "vocab-server-db-status", url: "https://vocab.audioblast.org/dbping", check: dbping}
  ];

  //Each request for counts from the audioBlast API: the tile that shows each count, and the keys that lead to it in the reply
  var countRequests = [
    {
      url: "https://api.audioblast.org/standalone/data/fetch_data_counts/",
      name: "the data counts",
      notice: "data-notice",
      tiles: {
        "data-counts-recordings": ["data", "counts", "recordings"],
        "data-counts-annotations": ["data", "counts", "annomate"],
        "data-counts-taxa": ["data", "counts", "taxa"],
        "data-counts-traits": ["data", "counts", "traits"],
        "data-counts-references": ["data", "counts", "references"]
      }
    },
    {
      url: "https://api.audioblast.org/standalone/analysis/fetch_analysis_counts/",
      name: "the analysis counts",
      notice: "analysis-notice",
      tiles: {
        "analysis-counts-aci": ["data", "counts", "analysis-aci"],
        "analysis-counts-adi": ["data", "counts", "analysis-adi"],
        "analysis-counts-bedoya": ["data", "counts", "analysis-bedoya"],
        "analysis-counts-bi": ["data", "counts", "analysis-bi"],
        "analysis-counts-birdnet-embeddings": ["data", "counts", "analysis_3sec-birdnet_default_embed"],
        "analysis-counts-birdnet-default": ["data", "counts", "d_3sec-birdnet_default-selection"],
        "analysis-counts-birdnet-latlon": ["data", "counts", "d_3sec-birdnet_latlon-selection"],
        "analysis-counts-evenness": ["data", "counts", "analysis-evenness"],
        "analysis-counts-H": ["data", "counts", "analysis-H"],
        "analysis-counts-M": ["data", "counts", "analysis-M"],
        "analysis-counts-ndsi": ["data", "counts", "analysis-ndsi"],
        "analysis-counts-sh": ["data", "counts", "analysis-sh"],
        "analysis-counts-tdsc": ["data", "counts", "analysis_3sec-tdsc"],
        "analysis-counts-th": ["data", "counts", "analysis-th"]
      }
    },
    {
      url: "https://api.audioblast.org/standalone/analysis/analysis_agents/",
      name: "the number of analysis agents",
      notice: "agents-notice",
      tiles: {
        "analysis-agents": ["data", "agents", "total"]
      }
    },
    {
      url: "https://api.audioblast.org/standalone/analysis/fetch_analysis_status/?cache=0",
      name: "the task counts",
      notice: "tasks-notice",
      tiles: {
        "assigned-tasks": ["data", "counts", "assigned"],
        "outstanding-tasks": ["data", "counts", "waiting"]
      }
    }
  ];

  var stateLabels = {checking: "Checking…", up: "Operational", down: "Down"};

  var numberFormat = new Intl.NumberFormat("en-GB");
  var timeFormat = new Intl.DateTimeFormat("en-GB", {hour: "2-digit", minute: "2-digit", second: "2-digit"});
  var dateFormat = new Intl.DateTimeFormat("en-GB", {day: "numeric", month: "long", year: "numeric"});

  var summary = document.getElementById("summary");
  var summaryIcon = summary.querySelector(".summary-icon use");
  var summaryTitle = document.getElementById("summary-title");
  var summaryTime = document.getElementById("summary-time");
  var button = document.getElementById("run-checks");

  var running = false;
  var lastChecked = null;

  //Fetches a URL as text, giving up if the whole reply hasn't arrived in time
  function request(url) {
    var controller = new AbortController();
    var timedOut = false;
    var timer = setTimeout(function () {
      timedOut = true;
      controller.abort();
    }, TIMEOUT_SECONDS * 1000);

    //Not from the browser's cache, so checking again asks the service again
    return fetch(url, {cache: "no-store", signal: controller.signal})
      .then(function (response) {
        return response.text().then(function (text) {
          return {ok: response.ok, status: response.status, text: text};
        });
      })
      .catch(function () {
        //The browser doesn't say why a request failed (the network, DNS or CORS, say), only that it did
        throw new Error(timedOut ? "No reply within " + TIMEOUT_SECONDS + " seconds" : "Connection failed");
      })
      .finally(function () {
        clearTimeout(timer);
      });
  }

  //A web server is up when it replies "pong"
  function ping(url) {
    return request(url).then(function (reply) {
      if (reply.text === "pong") {
        return {up: true};
      }
      return {up: false, detail: "Unexpected reply (HTTP " + reply.status + ")"};
    }, requestFailed);
  }

  //A database is up unless its check replies that the connection failed
  function dbping(url) {
    return request(url).then(function (reply) {
      if (reply.text.startsWith("Database connection failed:")) {
        return {up: false, detail: "Database connection failed"};
      }
      return {up: true};
    }, requestFailed);
  }

  //A service that couldn't be asked is shown as down, with the reason
  function requestFailed(error) {
    return {up: false, detail: error.message};
  }

  //Fetches a reply from the audioBlast API as JSON
  function fetchJson(url) {
    return request(url).then(function (reply) {
      if (!reply.ok) {
        throw new Error("The API replied with HTTP " + reply.status);
      }
      try {
        return JSON.parse(reply.text);
      } catch (error) {
        throw new Error("The reply wasn't valid JSON");
      }
    });
  }

  //Follows keys into a reply, giving undefined if any of them is missing
  function lookup(reply, keys) {
    return keys.reduce(function (value, key) {
      return value !== null && typeof value === "object" ? value[key] : undefined;
    }, reply);
  }

  //The API gives counts as strings of digits
  function toCount(value) {
    if (typeof value === "number" || (typeof value === "string" && value.trim() !== "")) {
      return Number(value);
    }
    return NaN;
  }

  function showTile(tile, state, text) {
    if (state) {
      tile.setAttribute("data-state", state);
    } else {
      tile.removeAttribute("data-state");
    }
    tile.textContent = text;
  }

  //Shows why counts couldn't be shown, or hides the notice when there's nothing to say
  function showNotice(notice, text) {
    notice.querySelector(".notice-text").textContent = text;
    notice.hidden = text === "";
  }

  //Fetches one set of counts and shows each in its tile
  function loadCounts(countRequest) {
    var notice = document.getElementById(countRequest.notice);
    var ids = Object.keys(countRequest.tiles);
    var tiles = ids.map(function (id) {
      return document.getElementById(id);
    });

    tiles.forEach(function (tile) {
      showTile(tile, "loading", "Loading");
    });
    showNotice(notice, "");

    return fetchJson(countRequest.url).then(function (reply) {
      var missing = 0;
      ids.forEach(function (id, index) {
        var count = toCount(lookup(reply, countRequest.tiles[id]));
        if (Number.isFinite(count)) {
          showTile(tiles[index], "", numberFormat.format(count));
        } else {
          showTile(tiles[index], "unavailable", "Not available");
          missing++;
        }
      });
      if (missing === ids.length) {
        showNotice(notice, "Couldn't find " + countRequest.name + " in the API's reply.");
      } else if (missing > 0) {
        showNotice(notice, "Some counts were missing from the API's reply.");
      }
    }, function (error) {
      tiles.forEach(function (tile) {
        showTile(tile, "unavailable", "Not available");
      });
      showNotice(notice, "Couldn't load " + countRequest.name + ". " + error.message + ".");
    });
  }

  function showCheck(card, state, detail) {
    card.setAttribute("data-state", state);
    card.querySelector(".check-state use").setAttribute("href", "#icon-" + state);
    card.querySelector(".check-label").textContent = stateLabels[state];
    card.querySelector(".check-detail").textContent = detail || "";
  }

  function showSummary(state, title, time) {
    summary.setAttribute("data-state", state);
    summaryIcon.setAttribute("href", state === "down" ? "#icon-alert" : "#icon-" + state);
    summaryTitle.textContent = title;
    summaryTime.textContent = time;
  }

  function checkedAt(date) {
    return "Last checked at " + timeFormat.format(date) + " on " + dateFormat.format(date);
  }

  //Runs every check and fetches every count, unless they are already running
  function run() {
    var started = new Date();
    var checks;
    var loads;

    if (running) {
      return;
    }
    running = true;
    button.setAttribute("aria-disabled", "true");
    showSummary("checking", "Checking services…", lastChecked ? checkedAt(lastChecked) : "This takes a few seconds.");

    checks = services.map(function (service) {
      var card = document.getElementById(service.id);
      showCheck(card, "checking");
      return service.check(service.url).then(function (result) {
        showCheck(card, result.up ? "up" : "down", result.detail);
        return result.up;
      });
    });
    loads = countRequests.map(loadCounts);

    Promise.all(checks).then(function (results) {
      var problems = results.filter(function (up) {
        return !up;
      }).length;

      lastChecked = started;
      if (problems === 0) {
        showSummary("up", "All services operational", checkedAt(started));
      } else {
        showSummary("down", problems === 1 ? "1 service has a problem" : problems + " services have problems", checkedAt(started));
      }
    });

    Promise.all(checks.concat(loads)).then(function () {
      running = false;
      button.removeAttribute("aria-disabled");
    });
  }

  button.addEventListener("click", run);
  run();
})();
