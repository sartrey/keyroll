import React, { Component } from 'react';
import { Button, Modal, Input } from 'antd';
import './FieldPanel.scss';

export default class FieldPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      model: props.model
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
    if (!item) {
      model.fields.unshift({ key: null, value: null, secure: null, editable: true });
    } else {
      const i = model.fields.findIndex(e => e.key === item.key);
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

  submitItem(item) {
    if (!item.key) {
      console.warn('illegal field key')
      return false;
    }
    if (this.props.onSubmitItem) {
      this.props.onSubmitItem(item);
    }
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
                  <div><Input placeholder='key' defaultValue={field.key} /></div>
                  <div><Input placeholder='value' defaultValue={field.value} /></div>
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
                <Button type="primary" shape="circle" icon="delete" onClick={e => this.removeItem()} />
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}