import React, { Component } from 'react';
import './Input.scss';

export default class Input extends Component {
  render() {
    const {
      type,
      defaultValue,
      onChange
    } = this.props;
    return (
      <input className='input' defaultValue={defaultValue} onChange={onChange} />
    );
  }
}