const root = document.getElementById('root')
const spanElement = React.createElement('span', {}, 'SPAN!')
const header = React.createElement('h1', {'id': 'header'}, 'Hey there', spanElement)

ReactDOM.render(header, root)

var a = document.getElementById('data').innerHTML;
console.log(a);
//var data = JSON.parse(document.getElementById('data').innerHTML);
//console.log(data)