import React, { Component } from 'react';
import { connect, state } from '@noflux/react';
import * as actions from './actions';
import DeviceList from './component/DeviceList';
import VolumnList from './component/VolumnList';
import VolumnView from './component/VolumnView';
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
  }

  render() {
    return (
      <div className='container'>
        <div className='sider1'>
          <div className='header'>
            <h1>KeyRoll</h1>
          </div>
          <DeviceList />
        </div>
        <div className='sider2'>
          <VolumnList />
        </div>
        <div className='content'>
          <VolumnView />
        </div>
      </div>
    )
  }
}

export default connect(App);