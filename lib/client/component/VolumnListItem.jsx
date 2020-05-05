import React, { Component } from 'react';
import { Button, Input } from './design';
import { createEditableListItem } from './higher/editable';
// import './VolumnListItem.scss';

class VolumnEditor extends Component {
  render() {
    const { model, onChange, onUpdate, onCancel } = this.props;
    return (
      <div>
        <Input defaultValue={model.domain} onChange={e => onChange('domain', e.target.value)} />
        <Button icon="save" onClick={onUpdate} />
        <Button icon="close" onClick={onCancel} />
      </div>
    );
  }
}

class VolumnViewer extends Component {
  render() {
    const { model, onActive, onRemove, onSelect } = this.props;
    return (
      <div onClick={onSelect}>
        <div>domain = {model.domain}</div>
        <Button icon="edit" onClick={onActive} />
        <Button icon="delete" onClick={onRemove} />
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
    className: 'volumn'
  }
);
