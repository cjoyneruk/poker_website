function getClass(value){
    if (value>0){
        return ['text-success']
    } else if (value<0) {
        return ['text-danger']
    } else {
        return []
    }
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

function createSummaryTable(headings, data, parent){

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

        for (let key of Object.keys(headings)){
            var classList = [];
            var value = entry[key]
            if (key=='money'){
                classList = getClass(value);
                if (value<0) {
                    value = '-£' + Math.abs(value).toFixed(2)
                } else {
                    value = '£' + value.toFixed(2)
                }
            } else if (key=='profit'){
                classList = getClass(value);
            }
            var td = createElement('td', {}, classList, value.toString(), tr);
        }
    }

    return table
}

function createDisplayDiv(headings, title, data, root_id, card_id, hidden){
  var card_attrs = {};
  var card_header_attrs = {};
  var card_body_attrs = {};

  if (card_id) {
      card_attrs['id'] = 'card_' + card_id;
      card_header_attrs['id'] = card_id;
      card_body_attrs['id'] = 'card_body_' + card_id;
  }

  if (hidden) {
    card_header_attrs['onclick'] = "toggleCardBody('" + card_id + "')";
    card_body_attrs['style'] = 'display: none';
  }

  var root = document.getElementById(root_id);
  var card = createCard(card_attrs, root);
  var card_header = createCardHeader(card_header_attrs, title, card);
  var card_body = createCardBody(card_body_attrs, null, card);
  var table = createSummaryTable(headings, data, card_body);
  var br = createBr(root);

}