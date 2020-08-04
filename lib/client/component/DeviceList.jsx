import React, { Component } from 'react';
import { connect, state } from '@noflux/react';
import { action } from '../store';
import { Icon } from './design';
import './DeviceList.scss';

class DeviceList extends Component {
  async componentDidMount() {
    await action.scanDevices();
  }

  async lockDevice(device) {
    if (device.secure.locked) return;
    device = await action.lockDevice({
      device: { name: device.name }
    });
    device.selected = true;
    const devices = state.get('devices')
      .map(e => e.name === device.name ? device : e);
    state.set('devices', devices);
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
