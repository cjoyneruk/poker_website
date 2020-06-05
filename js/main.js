game_ids = data.map(function(entry){
    return entry['game_id']
})

var max_id = Math.max.apply(Math, game_ids)

function sortData(data, variable){
	data.sort(function(a, b){return b[variable]- a[variable]});
}

// - Filter by variable
function filterData(data, variable, value){
	newdata = data.filter(function (x) {return x[variable]==value})
	return newdata
}

function createElement(type, attrs, classNames, context, parent) {

    var element = document.createElement(type);

    for (let className of classNames){
        element.classList.add(className);
    }

    for (let [attr, value] of Object.entries(attrs)) {
        element.setAttribute(attr, value);
    }

    if (context) {
        element.innerHTML = context;
    }

    if (parent){
        parent.appendChild(element);
    }

    return element
}

function createBr(parent){
    return createElement('br', {}, [], null, parent)
}

function createCard(attrs, parent){
    return createElement('div', attrs, ['card', 'shadow-sm', 'rounded-0'], null, parent)
}

function createCardHeader(attrs, context, card){
    return createElement('div', attrs, ['card-header', 'bg-secondary', 'text-light', 'px-3', 'py-2', 'rounded-0'], context, card)
}

function createCardBody(attrs, context, card){
    return createElement('div', attrs, ['card-body'], context, card)
}

function createTable(headings, data, parent){
    var table = createElement('table', {}, ['table', 'border-bottom'], null, parent);

    var thead = createElement('thead', {}, [], null, table);
    var tr = createElement('tr', {}, [], null, thead);

    var th = createElement('th', {}, [], '#', tr);
    for (let heading of Object.values(headings)){
        var th = createElement('th', {}, [], heading, tr);
    }

    var tbody = createElement('tbody', {}, [], null, table);

    for (i=0; i<data.length; i++){
        var tr = createElement('tr', {}, [], null, tbody);

        var entry = data[i];
        var th = createElement('th', {}, [], (i+1).toString(), tr);

        for (key of Object.keys(headings)){
            var td = createElement('td', {}, [], entry[key].toString(), tr);
        }
    }

    return table
}