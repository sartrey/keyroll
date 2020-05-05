import React, { Component } from 'react';
import { createEditableList } from './higher/editable';
import { Button } from './design';
import VolumnListItem from './VolumnListItem';
import * as actions from '../actions';
import { state } from '@noflux/react';

class EmptyVolumn extends Component {
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
    VolumnListItem,
    EmptyVolumn
  ],
  {
    className: 'volumn',
    reactKey: 'domain',
    dataSource: {
      select: async (item) => {
        console.log(item);
        const records = await actions.findRecords({ domain: item.domain });
        state.set('current.volumn', item);
        state.set('records', records);
      },
      delete: (item) => {
        actions.killVolumn();
      },
      update: async (item, next) => {
        await actions.editVolumn({}, next);
        return next;
      }
    }
  }
);
