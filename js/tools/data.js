game_ids = complete_data.map(function(entry){
    return entry['game_id']
})

var max_id = Math.max.apply(Math, game_ids)

function sortByVariable(variable, ascending){
    if (ascending) {
        return function(a, b) {return a[variable] - b[variable]};
    } else {
        return function(a, b) {return b[variable] - a[variable]};
    }
}

function filterByVariable(variable, value, equal){
    if (equal) {
        return function (x) {return x[variable]==value}
    } else {
        return function (x) {return x[variable]!=value}
    }
}

function extractVariable(variable){
    return function(entry){ return entry[variable]}
}

function getCumulative(data){
    var new_data = [];
    for (var i=0; i<data.length; i++){
        new_data.push(data[i])
        if (new_data[i] == null){
            new_data[i] = 0;
        }
        if (i==0){
        } else {
            new_data[i] += new_data[i-1]
        }

    }

    for (var i=0; i<data.length; i++){
        if (data[i] == null){
            new_data[i] = null;
        }
    }
    return new_data
}