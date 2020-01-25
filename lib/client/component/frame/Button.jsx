import React, { Component } from 'react';
import Icon from '@mdi/react';

export default class Button extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { name, icon, title } = this.props;
    return (
      <button className={`btn btn-${name}`}>
        <Icon path={icon} title={title} size={1} />
      </button>
    );
  }
}
