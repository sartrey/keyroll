import React, { Component } from 'react'
import Header from './Header'
import Footer from './Footer'
import './frame.scss';

export default class Layout extends Component {
  constructor(props) {
    super(props)
    this.state = {
      config: {}
    }
  }

  render() {
    var { config } = this.state
    return (
      <div className='wrapper'>
        <Header />
        <div className='holder'>
          {this.props.children}
        </div>
        <Footer />
      </div>
    )
  }
}
