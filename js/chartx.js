var MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

var labels = [];
for (i=1; i<=max_id; i++){
    labels.push('Game ' + i)
}

const players = [
    'Joyner',
    'Kieran',
    'Andy B',
    'Lewis',
    'IanB',
    'Amanda'
]

const colors = [{"name":"Charcoal","hex":"264653","rgb":[38,70,83],"cmyk":[54,15,0,67],"hsb":[197,54,33],"hsl":[197,37,24],"lab":[27,-7,-11]},{"name":"Azure","hex":"197cf0","rgb":[25,124,240],"cmyk":[89,48,0,5],"hsb":[212,90,94],"hsl":[212,88,52],"lab":[52,16,-65]},{"name":"Persian Green","hex":"2a9d8f","rgb":[42,157,143],"cmyk":[73,0,8,38],"hsb":[173,73,62],"hsl":[173,58,39],"lab":[58,-34,-1]},{"name":"Pistachio","hex":"add082","rgb":[173,208,130],"cmyk":[16,0,37,18],"hsb":[87,38,82],"hsl":[87,45,66],"lab":[79,-24,34]},{"name":"Maize Crayola","hex":"e9c46a","rgb":[233,196,106],"cmyk":[0,15,54,8],"hsb":[43,55,91],"hsl":[43,74,66],"lab":[80,2,49]},{"name":"Sandy Brown","hex":"f4a261","rgb":[244,162,97],"cmyk":[0,33,60,4],"hsb":[27,60,96],"hsl":[27,87,67],"lab":[73,24,45]},{"name":"Terra Cotta","hex":"e76f51","rgb":[231,111,81],"cmyk":[0,51,64,9],"hsb":[12,65,91],"hsl":[12,76,61],"lab":[60,44,38]}]

function getColor(array, alpha){
    return 'rgba(' + array[0] + ', ' + array[1] + ', ' + array[2] + ', ' + alpha + ')'
}

var datasets = []
for (i=0; i<players.length; i++){

    var player_data = filterData(data, 'player', players[i]);
    var profit_data = player_data.map(function(x){
        return x['profit']
    })
    datasets.push({
        label: players[i],
        data: profit_data,
        fill: false,
        backgroundColor: getColor(colors[i]["rgb"], 1),
        borderColor: getColor(colors[i]["rgb"], 0.6)
    })

}


var config = {
    type: 'line',
    data: {
        labels: labels,
        datasets: datasets
    },
    options: {
        responsive: true,
        title: {
            display: true,
            text: 'Profit'
        },
        tooltips: {
            mode: 'index',
            intersect: false,
        },
        hover: {
            mode: 'nearest',
            intersect: true
        },
        scales: {
            xAxes: [{
                display: true,
                scaleLabel: {
                    display: true,
                    labelString: 'Game'
                }
            }],
            yAxes: [{
                display: true,
                scaleLabel: {
                    display: true,
                    labelString: 'Profit (chips)'
                }
            }]
        },
        spanGaps: true
    }
};

//var colorNames = Object.keys(window.chartColors);
//document.getElementById('addDataset').addEventListener('click', function() {
//    var colorName = colorNames[config.data.datasets.length % colorNames.length];
//    var newColor = window.chartColors[colorName];
//    var newDataset = {
//        label: 'Dataset ' + config.data.datasets.length,
//        backgroundColor: newColor,
//        borderColor: newColor,
//        data: [],
//        fill: false
//    };
//
//    for (var index = 0; index < config.data.labels.length; ++index) {
//        newDataset.data.push(randomScalingFactor());
//    }
//
//    config.data.datasets.push(newDataset);
//    window.myLine.update();
//});

//document.getElementById('addData').addEventListener('click', function() {
//    if (config.data.datasets.length > 0) {
//        var month = MONTHS[config.data.labels.length % MONTHS.length];
//        config.data.labels.push(month);
//
//        config.data.datasets.forEach(function(dataset) {
//            dataset.data.push(randomScalingFactor());
//        });
//
//        window.myLine.update();
//    }
//});
//
//document.getElementById('removeDataset').addEventListener('click', function() {
//    config.data.datasets.splice(0, 1);
//    window.myLine.update();
//});
//
//document.getElementById('removeData').addEventListener('click', function() {
//    config.data.labels.splice(-1, 1); // remove the label first
//
//    config.data.datasets.forEach(function(dataset) {
//        dataset.data.pop();
//    });
//
//    window.myLine.update();
//});

