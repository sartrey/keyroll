import React, { Component } from 'react';
import { Button, Modal, Input } from 'antd';
import './FieldPanel.scss';

export default class FieldPanel extends Component {
  constructor(props) {
    super(props);
    this.idgen = 0;
    this.state = {
      model: props.model,
      input: []
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.model !== prevState.model) {
      return { model: nextProps.model };
    }
    return null;
  }

  activeEditableItem(item) {
    const { model } = this.state;
    this.idgen += 1;
    if (!item) {
      model.fields.unshift({ id: this.idgen, key: null, value: null, editable: true });
    } else {
      const i = model.fields.findIndex(e => e.id === item.id);
      if (i > -1) {
        model.fields[i].editable = true;
      }
    }
    this.setState({ model });
  }

  cancelEditableItem(item) {
    const { model } = this.state;
    const i = model.fields.indexOf(item);
    if (i > -1) {
      if (item.key) {
        model.fields[i].editable = false;
      } else {
        model.fields.splice(i, 1);
      }
    }
    this.setState({ model });
  }

  changeItem(item, key, value) {
    const { input, model } = this.state;
    let i = input.findIndex(e => e.id === item.id);
    if (i < 0) {
      i = input.push({ ...item }) - 1;
    }    
    input[i][key] = value;
    this.setState({ input });
  }

  submitItem(item) {
    const { input, model } = this.state;
    const change = input.find(e => e.id === item.id);
    // todo - more validator
    if (!change.key) {
      throw new Error('illegal field key');
    }
    if (this.props.onSubmitItem) {
      this.props.onSubmitItem(change);
    }
    const j = model.fields.indexOf(item);
    model.fields[j].editable = false;
    this.setState({ input, model });
  }

  removeItem(item) {
    if (this.props.onRemoveItem) {
      this.props.onRemoveItem(item);
    }
  }

  render() {
    const { model } = this.state;
    if (!model) {
      return (
        <div>empty</div>
      );
    }
    return (
      <div className="field-panel">
        <div className="field-panel-head">
          <div>{model.domain}</div>
          <Button type="primary" icon="plus" onClick={() => this.activeEditableItem()} />
        </div>
        <ul className='field-list'>
          {model.fields.map((field, i) => {
            if (field.editable) {
              return (
                <li className='field-item' key={field.key || `temp${i}`}>
                  <Input placeholder='key' defaultValue={field.key} onChange={e => this.changeItem(field, 'key', e.target.value)} />
                  <Input placeholder='value' defaultValue={field.value} onChange={e => this.changeItem(field, 'value', e.target.value)} />
                  <div>{field.secure}</div>
                  <Button type="primary" shape="circle" icon="save" onClick={() => this.submitItem(field)} />
                  <Button type="primary" shape="circle" icon="close" onClick={() => this.cancelEditableItem(field)} />
                </li>
              );
            }
            return (
              <li className='field-item' key={field.key}>
                <div>{field.key}</div>
                <div>{field.value}</div>
                <div>{field.secure}</div>
                <Button type="primary" shape="circle" icon="edit" onClick={e => this.activeEditableItem(field)} />
                <Button type="primary" shape="circle" icon="delete" onClick={e => this.removeItem(field)} />
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}