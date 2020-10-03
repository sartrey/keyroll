import React, { Component, cls } from 'react';
import Icon from './Icon';
import './Button.scss';

export default function Button(props) {
  const { size, icon, children } = props;
  return (
    <button className={cls('button', size)} onClick={props.onClick}>
      <Icon name={icon} />
      { children && (<span>{children}</span>) }
    </button>
  );
}