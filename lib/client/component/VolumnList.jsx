import React, { Component } from 'react';
import { state } from '@noflux/react';
import { action } from '../store';
import { createEditableList } from './higher/editable';
import { Button, Input } from './design';
import VolumnListItem from './VolumnListItem';
import './VolumnList.scss';

class VolumnListHeader extends Component {
  render() {
    return (
      <div className='header'>
        <Input onChange={e => this.filterVolumn(e.target.value)} />
        <Button icon='add' onClick={() => this.parent.createItem()} />
      </div>
    );
  }
}

export default createEditableList(
  [
    VolumnListItem,
    VolumnListHeader
  ],
  {
    entityName: 'volumn',
    entityKey: 'name',
    dataSource: {
      source: () => {
        return state.get('volumns');
      },
      select: async (item) => {
        const volumns = state.get('volumns').map(e => {
          if (e.name === item.name) {
            item.selected = true;
            return item;
          }
          e.selected = false;
          return e;
        });
        state.set('volumns', volumns);
        const device = state.get('devices').find(e => e.selected);
        await action.findRecords({
          device: { name: device.name },
          volumn: { name: item.name }
        });
      },
      delete: async (item) => {
        const device = state.get('devices').find(e => e.selected);
        await action.killVolumn({
          device: { name: device.name },
          volumn: { name: item.name }
        });
        await action.findVolumns({
          device: { name: device.name }
        });
      },
      update: async (item, next) => {
        const device = state.get('devices').find(e => e.selected);
        await action.editVolumn({
          device: { name: device.name },
          volumn: next
        });
        await action.findVolumns({
          device: { name: device.name }
        });
        return next;
      }
    }
  }
);
