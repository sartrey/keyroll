import React, { Component } from 'react';
import Icon from '@mdi/react';
import { mdiPlusBox } from '@mdi/js';
import 'whatwg-fetch';
import Layout from './component/frame/Layout';
import './index.scss';
import './theme.scss';

export default class extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: {
        keyword: '',
      },
      model: {
        records: [],
      },
      modal: null,
    };
  }

  componentDidMount() {
    this.loadRecords()
  }

  loadRecords(query) {
    let apiPath = '/__/api/getRecords'
    fetch(apiPath).then(response => response.json())
    .then(json => {
      if (json.state) {
        this.setState({
          records: json.model
        })
      }
    })
  }

  changeKeyword(e) {
    this.setState({ keyword: e.target.value })
  }

  openModal(name, data) {
    this.setState({ modal: { name, data } })
  }

  closeModal() {
    this.setState({ modal: null })
  }

  renderRecords() {
    const { query, model } = this.state;
    const { keyword } = query;
    const { records } = model;
    if (keyword) {
      records = records.filter(record => record.domain.indexOf(keyword) >= 0)
    }
    return (
      <div className='panel'>
        <div className='panel-head'>
          <div className='content'>
            <h1>Records</h1>
            <p></p>
          </div>
          <div className='actions'>
            <a className='button' onClick={e => this.openModal('new-record')}>
              <Icon path={mdiPlusBox} title="record" size={1} />
            </a>
          </div>
        </div>
        <div className='panel-body'>
          <ul>
            {records.map((record, i) => (
              <li className='file-item' key={i}>
                <a onClick={e => this.openModal('file-info', record)}>{record.domain}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }

  renderEntries() {
    const { query, model } = this.state;
    const { keyword } = query;
    const { records } = model;
    if (keyword) {
      records = records.filter(record => record.domain.indexOf(keyword) >= 0)
    }
    return (
      <div className='panel'>
        <div className='panel-head'>
          <div className='content'>
            <h1>Entries</h1>
            <p></p>
          </div>
          <div className='actions'>
            <a className='button' onClick={e => this.openModal('new-record')}>
              <Icon path={mdiPlusBox} title="record" size={1} />
            </a>
          </div>
        </div>
        <div className='panel-body'>
          <ul>
            {records.map((record, i) => (
              <li className='file-item' key={i}>
                <a onClick={e => this.openModal('file-info', record)}>{record.domain}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }

  render() {
    const { modal } = this.state;
    return (
      <Layout>
        <div className='workspace'>
          {this.renderRecords()}
          {this.renderEntries()}
        </div>
        {modal && modal.name === 'file-info'}
      </Layout>
    )
  }
}
