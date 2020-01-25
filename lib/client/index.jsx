import React, { Component } from 'react';
import Icon from '@mdi/react';
import { mdiPlusBox } from '@mdi/js';
import 'whatwg-fetch';
import Button from './component/frame/Button';
import Layout from './component/frame/Layout';
import Panel from './component/frame/Panel';
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
    return fetch(apiPath).then(response => response.json())
    .then(json => {
      if (json.state) {
        this.setState({
          records: json.model
        })
      }
    })
  }

  saveRecord() {
    let apiPath = '/__/api/setRecord';
    return fetch(apiPath, { method: 'POST' }).then(response => response.json())
    .then(json => {
      if (json.state) {
        this.setState({
        });
      }
    });
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

  renderDevices() {
    const { query, model } = this.state;
    const { keyword } = query;
    const { records } = model;
    if (keyword) {
      records = records.filter(record => record.domain.indexOf(keyword) >= 0)
    }
    const actions = [
      { icon: mdiPlusBox, title: 'record', click: e => this.openModal('new-record') },
      { icon: mdiPlusBox, title: 'record', click: e => this.openModal('new-record') }
    ];
    return (
      <Panel name='devices'>
        <ul>
          {records.map((record, i) => (
            <li className='file-item' key={i}>
              <a onClick={e => this.openModal('file-info', record)}>{record.domain}</a>
            </li>
          ))}
        </ul>
      </Panel>
    );
  }

  renderRecords() {
    const { query, model } = this.state;
    const { keyword } = query;
    const { records } = model;
    if (keyword) {
      records = records.filter(record => record.domain.indexOf(keyword) >= 0)
    }
    return (
      <Panel name='records'>
        <div className='control-box'>
          <Button name='new-record' icon={mdiPlusBox} title='new record' onClick={() => this.createRecord()} />
        </div>
        <ul>
          {records.map((record, i) => (
            <li className='file-item' key={i}>
              <a onClick={e => this.openModal('file-info', record)}>{record.domain}</a>
            </li>
          ))}
        </ul>
      </Panel>
    );
  }
  
  renderContent() {
    const { query, model } = this.state;
    const { keyword } = query;
    const { records } = model;
    if (keyword) {
      records = records.filter(record => record.domain.indexOf(keyword) >= 0)
    }
    return (
      <Panel name='content' title='Content' actions={[]}>
        <ul>
          {records.map((record, i) => (
            <li className='file-item' key={i}>
              <a onClick={e => this.openModal('file-info', record)}>{record.domain}</a>
            </li>
          ))}
        </ul>
      </Panel>
    );
  }

  render() {
    const { modal } = this.state;
    return (
      <Layout>
        <div className='workspace'>
          {this.renderDevices()}
          {this.renderRecords()}
          {this.renderContent()}
        </div>
        {modal && modal.name === 'file-info'}
      </Layout>
    )
  }
}
