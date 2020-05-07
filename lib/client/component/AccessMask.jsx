import React, { Component, cls } from 'react';
import { connect, state } from '@noflux/react';
import { Icon } from './design';
import * as actions from '../actions';
import './AccessMask.scss';

class AccessMask extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: {
        code: ''
      },
      error: {
      }
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

  lockDevice(name) {
    const { input } = this.state;
    return actions.lockDevice({ name, code: input.code })
      .then(() => {})
      .catch((error) => {});
  }

  unlockDevice(name, code) {   
    const { input } = this.state; 
    return actions.unlockDevice({ name, code: input.code })
      .then(() => {
        input.code = '';
        this.setState({ input });
      })
      .catch((error) => {
        this.setState({
          error: { message: error.message }
        });
      });
  }

  renderCodeUpdate() {
    const devices = state.get('devices');
    const currentDevice = devices[state.get('current.device')];
    const { input, error } = this.state;
    return (
      <div>
        <Icon name='lock' />
        <input type='password' value={input.code}
          onChange={e => this.changeInput('code', e.target.value)}
          onKeyUp={e => this.handleEnter(e.keyCode, () => this.lockDevice(currentDevice.name))} />
        <button onClick={() => this.randomCode()}>random</button>
      </div>
    );
  }

  renderCodeVerify() {
    const devices = state.get('devices');
    const currentDevice = devices[state.get('current.device')];
    const { input, error } = this.state;
    return (
      <div>
        <Icon name='lock' />
        <input type='password' value={input.code}
          onChange={e => this.changeInput('code', e.target.value)} 
          onKeyUp={e => this.handleEnter(e.keyCode, () => this.unlockDevice(currentDevice.name))} />
      </div>
    );
  }

  render() {
    const devices = state.get('devices');
    const currentDevice = devices[state.get('current.device')];
    if (!currentDevice) {
      return (<div className='access-mask' />);
    }
    const canAccess = !currentDevice.secure.notSet && !currentDevice.secure.locked;
    return (
      <div className={cls('access-mask', canAccess && 'hide')}>
        { currentDevice.secure.notSet ? this.renderCodeUpdate() : this.renderCodeVerify() }
      </div>
    );
  }
}

export default connect(AccessMask);