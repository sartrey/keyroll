import React, { Component } from 'react';
import { Button, Input } from './design';
import { createEditableListItem } from './higher/editable';

class VolumnEditor extends Component {
  render() {
    const { model, onChange, onUpdate, onCancel } = this.props;
    return (
      <div>
        <Input defaultValue={model.name} onChange={e => onChange('name', e.target.value)} />
        <Button icon="save" onClick={onUpdate} />
        <Button icon="close" onClick={onCancel} />
      </div>
    );
  }
}

class VolumnViewer extends Component {
  render() {
    const { model, onActive, onRemove, onSelect, selected } = this.props;
    return (
      <div className='viewer' onClick={onSelect}>
        <div className='logo'>
          <img />
        </div>
        <div className='info'>
          <div>{model.name}</div>
          { selected && (
            <div className='action'>
              <Button size='small' icon="edit" onClick={onActive}>edit</Button>
              <Button size='small' icon="delete" onClick={onRemove}>remove</Button>
            </div>
          ) }
        </div>
      </div>
    );
  }
}

export default createEditableListItem(
  [
    VolumnEditor,
    VolumnViewer
  ],
  {
    entityName: 'volumn'
  }
);
