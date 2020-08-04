import React, { Component } from 'react';
import './Icon.scss';

export default function Icon(props) {
  return (
    <i className='icon'>{props.name}</i>
  );
}
