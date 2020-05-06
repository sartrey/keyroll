import React, { Component, cls } from 'react';
import Icon from './Icon';
import './Button.scss';

export default class Button extends Component {
  render() {
    const { size, icon, children } = this.props;
    return (
      <button className={cls('button', size)} onClick={this.props.onClick}>
        <Icon name={icon} />
        { children && (<span>{children}</span>) }
      </button>
    );
  }
}