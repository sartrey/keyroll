import React, { Component } from 'react';
import { Button, Input } from './design';
import { createEditableListItem } from './higher/editable';
// import './RecordListItem.scss';

class RecordEditor extends Component {
  render() {
    const { model, onChange, onUpdate, onCancel } = this.props;
    return (
      <div>
        <Input placeholder='name' defaultValue={model.name} onChange={e => onChange('name', e.target.value)} />
        <Input placeholder='value' defaultValue={model.value} onChange={e => onChange('value', e.target.value)} />
        <div>{model.secure}</div>
        <Button icon="save" onClick={onUpdate} />
        <Button icon="close" onClick={onCancel} />
      </div>
    );
  }
}

class RecordViewer extends Component {
  render() {
    const { model, onActive, onRemove, onSelect } = this.props;
    return (
      <div onClick={onSelect}>
        <div>name = {model.name}</div>
        <div>value = {model.value}</div>
        <div>{model.secure}</div>
        <Button icon="edit" onClick={onActive} />
        <Button icon="delete" onClick={onRemove} />
      </div>
    );
  }
}

export default createEditableListItem(
  [
    RecordEditor,
    RecordViewer
  ],
  {
    className: 'record'
  }
);
