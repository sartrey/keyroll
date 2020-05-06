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
import * as actions from './actions';
import DeviceList from './component/DeviceList';
import VolumnList from './component/VolumnList';
import RecordList from './component/RecordList';
import './index.scss';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: {},
    };
    actions.initState();
  }

  componentDidMount() {
    actions.scanDevices();
    actions.findVolumns();
  }

  render() {
    const volumns = state.get('volumns');
    const records = state.get('records');
    return (
      <div className='container'>
        <div className='sider1'>
          <div className='header'>
            <h1>KeyRoll</h1>
          </div>
          <DeviceList />
        </div>
        <div className='sider2'>
          <VolumnList model={volumns} />
        </div>
        <div className='content'>
          <RecordList model={records} />
        </div>
      </div>
    )
  }
}

export default connect(App);