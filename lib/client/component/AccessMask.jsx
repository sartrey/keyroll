import React, { Component, cls } from 'react';
import { connect, state } from '@noflux/react';
import { action } from '../store';
import { Icon, Button } from './design';
import './AccessMask.scss';

class AccessMask extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: {
        code: ''
      },
      error: null
    };
  }

  changeInput(key, value) {
    const { input } = this.state;
    input[key] = value;
    this.setState({ input });
  }

  handleEnter(key, action) {
    if (key === 13) action();
  }

  randomCode() {
    throw new Error('not support');
  }

  lockDevice(device) {
    const { input } = this.state;
    return action.lockDevice({ 
      device: { name: device.name, code: input.code }
    })
      .then(() => {})
      .catch((error) => {
        this.setState({ error: error.code })
      });
  }

  async unlockDevice(device) {   
    const { input } = this.state; 
    device = await action.unlockDevice({ 
      device: { name: device.name, code: input.code }
    });
    device.selected = true;
    const devices = state.get('devices')
      .map(e => e.name === device.name ? device : e);
    state.set('devices', devices);
    input.code = ''
    this.setState({ input });
  }

  renderSecretPanel(device) {
    const { input, error } = this.state;
    if (!device) return;
    if (!device.secure.secret && device.size > 0) {
      return (
        <div>
          <h1>danger</h1>
          <p>your device is broken</p>
        </div>
      );
    }
    return (
      <div>
        <h1>create secret</h1>
        <input type='password' value={input.code}
          onChange={e => this.changeInput('code', e.target.value)}
          onKeyUp={e => this.handleEnter(e.keyCode, () => this.lockDevice(device))} />
        <Button onClick={() => this.randomCode()}>random</Button>
      </div>
    );
  }

  renderAccessPanel(device) {
    const { input, error } = this.state;
    return (
      <div>
        <h1>verify secret</h1>
        <input type='password' value={input.code}
          onChange={e => this.changeInput('code', e.target.value)} 
          onKeyUp={e => this.handleEnter(e.keyCode, () => this.unlockDevice(device))} />
      </div>
    );
  }

  render() {
    const devices = state.get('devices');
    const currentDevice = devices.find(e => e.selected);
    const willBlockAccess = !currentDevice || !currentDevice.secure.secret || currentDevice.secure.locked;
    return (
      <div className={cls('access-mask', !willBlockAccess && 'hide')}>
        { (currentDevice && currentDevice.secure.secret)
        ? this.renderAccessPanel(currentDevice)
        : this.renderSecretPanel(currentDevice) }
      </div>
    );
  }
}

export default connect(AccessMask);