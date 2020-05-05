import React, { Component } from 'react';
import { connect, state } from '@noflux/react';
import * as actions from './actions';
import { Input } from './component/design';
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
    const volumn = state.get('current.volumn');
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
          <div className='header'>
            <Input onChange={e => this.searchVolumn(e.target.value)} />
          </div>
          <VolumnList model={volumns} />
        </div>
        <div className='content'>
          { volumn ? (
            <div className='volumn-view'>
              <div className='volumn-head'>
                <div>domain = {volumn.domain}</div>
              </div>
              <RecordList model={records} />
            </div>
          ) : (
            <div className='volumn-view'>
              <div className='empty'>empty</div>
            </div>
          ) }
        </div>
      </div>
    )
  }
}

export default connect(App);