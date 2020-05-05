import React, { Component } from 'react';
import { createEditableList } from './higher/editable';
import { Button } from './design';
import RecordListItem from './RecordListItem';
import * as actions from '../actions';

class EmptyRecord extends Component {
  render() {
    return (
      <div>
        empty
        <Button icon='add' onClick={this.props.onCreate} />
      </div>
    );
  }
}

export default createEditableList(
  [
    RecordListItem,
    EmptyRecord
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
