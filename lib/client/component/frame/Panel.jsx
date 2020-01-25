import React, { Component } from 'react';

export default class Panel extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { name } = this.props;
    return (
      <div className={`panel panel-${name}`}>
        {this.props.children}
      </div>
    );
  }
}
