import React, { Component } from 'react';
import { createEditableList } from './higher/editable';
import { Button } from './design';
import RecordListItem from './RecordListItem';
import { state } from '@noflux/react';
import * as actions from '../actions';
import './RecordList.scss';

class RecordListHeader extends Component {
  render() {
    const volumn = state.get('current.volumn');
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
    RecordListHeader
  ],
  {
    className: 'record',
    reactKey: 'id',
    dataSource: {
      delete: (item) => {
        return actions.killRecord();
      },
      update: async (item, next) => {
        await actions.editRecord({}, next);
        return next;
      }
    }
  }
);
