import React, { Component } from 'react';
import 'whatwg-fetch';
import { Modal, Input } from 'antd';

export default class extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: props.visible,
      input: {
        domain: ''
      }
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps.visible !== this.state.visible) {
      this.setState({ visible: nextProps.visible });
      return true;
    }
    if (nextState.visible !== this.state.visible) {
      return true;
    }
    return false;
  }

  toggleModal(visible) {
    this.setState({ visible });
  }

  changeInput(key, e) {
    const { input } = this.state;
    input[key] = e.target.value;
    this.setState(input);
  }

  submitInput() {
    this.toggleModal(false);
    if (this.props.onSubmit) {
      this.props.onSubmit(this.state.input);
    }
  }

  render() {
    const { visible } = this.state;
    return (
      <Modal title="New Record" visible={visible} onOk={() => this.submitInput()} onCancel={() => this.toggleModal(false)}>
        <Input placeholder="Domain" onChange={e => this.changeInput('domain', e)} />
      </Modal>
    );
  }
}
