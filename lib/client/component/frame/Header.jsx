import React, { Component } from 'react';

export default class Header extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <header>
        <div className='logo'>keyroll</div>
      </header>
    )
  }
}
