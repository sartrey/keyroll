import React, { Component } from 'react';

React.cls = function concatClassNames() {
  let names = arguments;
  if (arguments.length === 1) {
    names = arguments[0];
  } else {
    names = Array.prototype.slice.call(arguments);
  }
  if (Array.isArray(names)) {
    return names.filter(Boolean).join(' ');
  }
  return names;
}

import { connect, state } from '@noflux/react';
import store from './store';
import DeviceList from './component/DeviceList';
import VolumnList from './component/VolumnList';
import RecordList from './component/RecordList';
import AccessMask from './component/AccessMask';
import './index.scss';

class App extends Component {
  constructor(props) {
    super(props);
    store.initialize();
  }

  render() {
    return (
      <div className='container'>
        <div className='side'>
          <div className='header'>
            <h1>KeyRoll</h1>
          </div>
          <DeviceList />
        </div>
        <div className='main'>
          <VolumnList />
          <RecordList />
          <AccessMask />
        </div>
      </div>
    )
  }
}

export default connect(App);