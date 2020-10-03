import React, { Component } from 'react';
import { createEditableList } from './higher/editable';
import { Button } from './design';
import RecordListItem from './RecordListItem';
import { connect, state } from '@noflux/react';
import { action } from '../store';
import './RecordList.scss';

class RecordListHeader extends Component {
  render() {
    const volumn = state.get('volumns').find(e => e.selected);
    console.log('volumn', volumn);
    if (!volumn) {
      return (
        <div className='header'>
          empty
        </div>
      );
    }
    return (
      <div className='header'>
        <div className='detail'>
          <div className='logo'>
            <img />
          </div>
          <div className='info'>
            <h1>{volumn.name}</h1>
          </div>
        </div>
        <div className='action'>
          <Button icon='add' onClick={() => this.parent.createItem()}>add record</Button>
        </div>
      </div>
    );
  }
}

export default createEditableList(
  [
    RecordListItem,
    connect(RecordListHeader)
  ],
  {
    entityName: 'record',
    entityKey: 'id',
    dataSource: {
      source: () => {
        return state.get('records');
      },
      select: () => {},
      delete: async (item) => {
        const device = state.get('devices').find(e => e.selected);
        const volumn = state.get('volumns').find(e => e.selected);
        const records = state.get('records');
        await action.killRecord({
          device: { name: device.name },
          volumn: { name: volumn.name },
          record: { id: item.id }
        });
        const index = records.findIndex(e => e.id === item.id);
        if (index >= 0) {
          state.cursor('records').splice(index, 1);
        }
      },
      update: async (item, next) => {
        const device = state.get('devices').find(e => e.selected);
        const volumn = state.get('volumns').find(e => e.selected);
        const record = { ...next };
        if (item.$temp) {
          record.id = undefined;
        }
        await action.editRecord({
          device: { name: device.name },
          volumn: { name: volumn.name },
          record
        })
          .then(result => {
            record.id = result.id;
            // todo - show value ?
          });
        if (item.$temp) {
          state.cursor('records').push(record);
        } else {
          const records = state.get('records');
          const index = records.findIndex(e => e.id === item.id);
          state.cursor('records').splice(index, 1, record);
        }
        return next;
      }
    }
  }
);
