import React, { Component } from 'react';
import './Icon.scss';

export default class Icon extends Component {
  render() {
    const { name } = this.props;
    return (
      <i className='material-icons'>{name}</i>
    );
  }
}
