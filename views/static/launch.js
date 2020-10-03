;(function () {
  var root = document.getElementById('app');
  if (!root) throw new Error('epii root not provided');
  var view = window.epii.entry;
  if (!view) throw new Error('epii view not provided');
  ReactDOM.render(React.createElement(view), root);
}());