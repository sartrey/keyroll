import React, { Component } from 'react';
import { Button, Input } from 'antd';
import * as actions from '../actions';
// import './RecordItem.scss';

export default class RecordView extends Component {
  constructor(props) {
    super(props);
    const { model } = props;
    this.state = {
      input: {
        id: model.new ? null: model.id,
        type: model.type,
        name: model.name,
        value: model.value
      },
      stage: model.new ? 'editor' : 'viewer'
    };
  }

  activeInput() {
    this.setState({ stage: 'editor' });
  }

  cancelInput() {
    const { model } = this.props;
    // todo - confirm unsaved
    if (model.new) {
      this.raiseRemove(model.id);
    } else {
      this.setState({ stage: 'viewer' });
    }
  }

  submitInput() {
    const { input } = this.state;
    if (!input.name) {
      console.error('name required');
      return;
    }
    if (!input.value) {
      console.error('value required');
      return;
    }
    // todo - validate input
    actions.editRecord({}, input)
      .then((newModel) => {
        this.raiseUpdate(this.props.model.id, newModel.id);
        this.setState({ stage: 'viewer' });
      });
  }

  removeModel() {
    const { model } = this.props;
    actions.killRecord({}, { id: model.id })
      .then(() => {
        this.raiseRemove(model.id);
      });
  }

  changeInput(key, value) {
    const { input } = this.state;
    input[key] = value;
    this.setState({ input });
  }

  raiseRemove(oldId) {
    if (this.props.onRemove) {
      this.props.onRemove(oldId);
    }
  }

  raiseUpdate(oldId, newId) {
    if (this.props.onUpdate) {
      this.props.onUpdate(oldId, newId);
    }
  }

  render() {
    const { stage } = this.state;
    const { model } = this.props;
    if (stage === 'editor') {
      return (
        <li className='record-item'>
          <Input placeholder='name' defaultValue={model.name} onChange={e => this.changeInput('name', e.target.value)} />
          <Input placeholder='value' defaultValue={model.value} onChange={e => this.changeInput('value', e.target.value)} />
          <div>{model.secure}</div>
          <Button type="primary" shape="circle" icon="save" onClick={() => this.submitInput()} />
          <Button type="primary" shape="circle" icon="close" onClick={() => this.cancelInput()} />
        </li>
      );
    }
    return (
      <li className='record-item'>
        <div>{model.name}</div>
        <div>{model.value}</div>
        <div>{model.secure}</div>
        <Button type="primary" shape="circle" icon="edit" onClick={e => this.activeInput()} />
        <Button type="primary" shape="circle" icon="delete" onClick={e => this.removeModel()} />
      </li>
    );
  }
}
