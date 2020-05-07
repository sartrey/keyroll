import React, { Component } from 'react';
import { connect, state } from '@noflux/react';
import { Icon } from './design';
import * as actions from '../actions';
import './DeviceList.scss';

class DeviceList extends Component {
  componentDidMount() {
    actions.scanDevices();
  }

  lockDevice(device) {
    if (device.secure.locked) return;
    actions.lockDevice({ name: device.name });
  }

  render() {
    const devices = state.get('devices');
    return (
      <div className='device-list'>
        <ul>
          {devices.map(device => (
            <li key={device.name} onClick={() => this.lockDevice(device)}>
              <span>{device.name}</span>
              <Icon name={device.secure.locked ? 'lock' : 'lock_open'} />
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default connect(DeviceList);
