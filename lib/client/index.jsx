import React, { Component } from 'react';
import { connect, state } from '@noflux/react';
import { Menu, Icon } from 'antd';
import * as actions from './actions';
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

  renderDevices() {
    const { query } = this.state;
    const devices = state.get('devices');
    return (
      <Menu mode='inline' defaultSelectedKeys={['localhost']}>
        {Object.keys(devices).map(deviceName => (
          <Menu.Item key={deviceName}>
            <Icon type='user' />
            <span>{deviceName}</span>
          </Menu.Item>
        ))}
      </Menu>
    );
  }

  render() {
    return (
      <div className='container'>
        <div className='sider1'>
          <div className='header'>
            <h1>KeyRoll</h1>
          </div>
          { this.renderDevices() }
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