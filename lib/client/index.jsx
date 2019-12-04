import React, { Component } from 'react';
import './index.scss';

export default class extends Component {
  render() {
    return (
      <div className='wrapper'>
        <div className='header'>
          <a className='myself' href='/__/'>KeyRoll</a>
          <a className='github' href='https://github.com/sartrey/keyroll'>
            github.com/sartrey/keyroll
          </a>
        </div>
      </div>
    );
  }
}
