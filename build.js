const path = require('path');
const epiiRender = require('@epiijs/render');

const config = {
  path: {
    root: path.join(__dirname, 'lib'),
    source: 'client',
    target: 'static',
  },
  filter: 'component', // skip client/**/component/*
  holder: {
    name: 'app',  // view container name, name='app' means div#app
    stub: 'epii', // window namespace, stub='epii' means window.epii.view = React view
  },
  expert: {
    'skip-clean': false // default false
  },
};

if (process.env.NODE_ENV === 'development') {
  epiiRender.watch(config);
  require('./')();
} else {
  epiiRender.build(config);
}
