import React, { Component } from 'react';
import { connect, state } from '@noflux/react';
import './DeviceList.scss';

class DeviceList extends Component {
  render() {
    const devices = state.get('devices');
    return (
      <div className='device-list'>
        <ul>
        {Object.keys(devices).map(deviceName => (
          <li key={deviceName}>
            <span>{deviceName}</span>
          </li>
        ))}
        </ul>
      </div>
    );
  }
}

export default connect(DeviceList);
