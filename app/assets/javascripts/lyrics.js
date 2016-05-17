var code = (function() {

    var makeAjaxRequest = function(method, url, data, onload) {
        var xhr = new XMLHttpRequest();
        xhr.onload = function() {
            onload(xhr);
        };
        xhr.open(method, url, true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.setRequestHeader('Data-Type', 'json');
        xhr.send(JSON.stringify(data));
    };

    var attachSelectArtistHandler = function() {
        var parent = document.getElementById("artist-list");
        parent.addEventListener('click', selectArtist, false);
    };

    var selectArtist = function(e) {
        if (e.target !== e.currentTarget) {    
            var artistId = e.target.name;
            var data = {
                id: artistId
            };
            var onload = function(xhr) {
                if (xhr.status === 200) {
                    var response = (JSON.parse(xhr.responseText));
                    displayWordcounts(response.wc_data);
                } else {
                    console.log("Status code: " + xhr.statusText);
                }
            };
            makeAjaxRequest('GET', '/artists/' + artistId, data, onload);

        }
        e.stopPropagation();
    };

    var displayWordcounts = function(data) {
        var table = document.getElementById("wc-table");
        table.innerHTML = "";
        for (var i = 0; i < data.length; i++) {
            table.innerHTML += "<tr><td>" + data[i].word
                            + "</td><td>" + data[i].count
                            + "</td></tr>";
        }
    };

    // Highcharts
    var initHighCharts = function() {
        window.chart = new Highcharts.Chart({
            chart: {
                renderTo: container,
                height: 200,
                type: 'bar'
            },
            title: {
                text: 'Everyone\'s Favorite Words'
            },
            xAxis: {
                // categories: array of wc.words
            },
            yAxis: {
                title: {
                    text: 'Word Frequency'
                }
            },
            series: [{
                // name: get artist.name,
                // data: array of wc.counts
            }, {
                name: 'Next Artist',
                data: []
            }]
        });
        window.chart = new Highcharts.Chart({
            chart: {
                renderTo: container2,
                height: 200,
                type: 'bar'
            },
            title: {
                text: 'Popular Healthy Murder Weapons'
            },
            xAxis: {
                categories: ['Oranges', 'Bananas', 'Candy Corns']
            },
            yAxis: {
                title: {
                    text: 'Fruit eaten'
                }
            },
            series: [{
                name: 'Sean',
                data: [6,1,9]
            }, {
                name: 'David',
                data: [3,2,3]
            }]
        });
    };



    var start = function() {
        attachSelectArtistHandler();
        initHighCharts();
    };

    return {
        start: start
    };
})();

document.addEventListener('DOMContentLoaded', function() {
    code.start();
});