import React, { Component } from 'react';
import { connect, state } from '@noflux/react';
import { Button } from 'antd';
import * as actions from '../actions';
import RecordView from './RecordView';
import './VolumnView.scss';

class VolumnView extends Component {
  constructor(props) {
    super(props);
    this.idgen = 0;
  }

  createRecord() {
    this.idgen += 1;
    const newRecord = { id: this.idgen, key: null, value: null, new: true };
    state.cursor('records').unshift(newRecord);
  }

  removeRecord(oldId) {
    const records = state.get('records');
    const i = records.findIndex(e => e.id === oldId);
    console.log(oldId, i);
    if (i >= 0) {
      state.cursor('records').splice(i, 1);
    }
  }

  updateRecord(oldId, newId) {
    actions.findRecord({ id: newId })
      .then((model) => {
        const records = state.get('records');
        const i = records.findIndex(e => e.id === oldId);
        console.log(oldId, i);
        if (i >= 0) {
          state.cursor('records').splice(i, 1, model);
        }
      });
  }

  render() {
    const volumn = state.get('current.volumn');
    if (!volumn) {
      return (
        <div className='volumn-area'>
          <div className='empty'>empty</div>
        </div>
      );
    }
    const records = state.get('records');
    return (
      <div className='volumn-area'>
        <div className='volumn-head'>
          <div>domain = {volumn.domain}</div>
          <Button type='primary' icon='plus' onClick={() => this.createRecord()} />
        </div>
        <ul className='record-list'>
          {records.map((item, i) => (
            <RecordView key={item.key || `temp-${item.id}`} model={item} 
              onRemove={e => this.removeRecord(e)} 
              onUpdate={(e1, e2) => this.updateRecord(e1, e2)} />
          ))}
        </ul>
      </div>
    );
  }
}

export default connect(VolumnView);