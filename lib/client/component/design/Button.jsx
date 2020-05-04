import React, { Component } from 'react';
import Icon from './Icon';
import './Button.scss';

export default class Button extends Component {
  render() {
    const { icon } = this.props;
    return (
      <button className='button' onClick={this.props.onClick}>
        <Icon name={icon} />
        {this.props.children}
      </button>
    );
  }
}