import React, { Component } from 'react';
import { Button, Input } from './design';
import { createEditableListItem } from './higher/editable';

class RecordEditor extends Component {
  render() {
    const { model, input, onChange, onUpdate, onCancel } = this.props;
    return (
      <div>
        <Input placeholder='name' defaultValue={model.name} onChange={e => onChange('name', e.target.value)} />
        <Input placeholder='value' defaultValue={model.value} onChange={e => onChange('value', e.target.value)} />
        <input type='checkbox' checked={input.seal} onChange={e => onChange('seal', e.target.checked)} />
        <div>
          <Button icon="save" onClick={onUpdate} />
          <Button icon="close" onClick={onCancel} />
        </div>
      </div>
    );
  }
}

class RecordViewer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      model: {
        unsealedValue: false
      }
    };
  }

  render() {
    const { model, onActive, onRemove, onSelect } = this.props;
    return (
      <div className='record-viewer' onClick={onSelect}>
        <div className='field-name'>{model.name}</div>
        <div>type = {model.type}</div>
        <div className='field-value'>
          { model.seal ? (this.state.model.unsealedValue && '***') : model.value }
        </div>
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
    entityName: 'record'
  }
);
