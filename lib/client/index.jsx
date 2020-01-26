import React, { Component } from 'react';
import 'whatwg-fetch';
import { Layout, Button, Menu, Icon, Modal, Input } from 'antd';
import NewRecordModal from './component/NewRecordModal';
import NewFieldModal from './component/NewFieldModal';
import Record from '../shared/record';
import './index.scss';

export default class extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: {
      },
      model: {
        devices: {},
        records: [],
        current: null,
      },
      modal: {
        'new-record': false,
        'new-field': false
      },
    };
  }

  componentDidMount() {
    this.scanDevices();
    this.loadRecords();
  }

  scanDevices() {
    let apiPath = '/__/data/scanDevices';
    return fetch(apiPath)
    .then(response => response.json())
    .then(json => {
      if (json.state) {
        const { model } = this.state;
        model.devices = json.model;
        this.setState({ model });
      }
    });
  }

  loadRecord(query) {
    let apiPath = '/__/data/loadRecord';
    return fetch(apiPath)
    .then(response => response.json())
    .then(json => {
      if (json.state) {
        const { model } = this.state;
        const i = model.records.findIndex(e => e.domain === query.domain);
        if (i < 0) {
          model.records.push(json.model);
        } else {
          model.records.splice(i, 1, json.model);
        }
        this.setState({ model });
      }
    });
  }

  loadRecords(query) {
    let apiPath = '/__/data/loadRecords'
    return fetch(apiPath)
    .then(response => response.json())
    .then(json => {
      if (json.state) {
        const { model } = this.state;
        model.records = json.model;
        console.log(model.records);
        model.current = model.records[0];
        this.setState({ model });
      }
    })
  }

  saveRecord(record) {
    let apiPath = '/__/data/saveRecord';
    return fetch(apiPath, {
      method: 'POST',
      body: JSON.stringify(record)
    })
    .then(response => response.json())
    .then(json => {
      if (json.state) {
      }
    });
  }

  saveRecordField(record) {
    console.log(record);
    let apiPath = '/__/data/saveRecordField';
    return fetch(apiPath, {
      method: 'POST',
      body: JSON.stringify(record)
    })
    .then(response => response.json())
    .then(json => {
      this.loadRecord();
    });
  }

  killRecordField() {
  }

  submitInput(type, data) {
    const { model, modal } = this.state;
    if (type === 'new-record') {
      this.saveRecord(data)
        .then(() => {
          this.loadRecords();
          modal['new-record'] = false;
          this.setState({ modal });
        });
    }
    if (type === 'new-field') {
      const record = model.current;
      record.fields.push(data);
      this.saveRecordField(record)
        .then(() => {
          this.loadRecord({ domain: record.domain });
          modal['new-field'] = false;
          this.setState({ modal });
        });
    }
  }

  showModal(name, hidden) {
    const { modal } = this.state;
    modal[name] = !hidden;
    this.setState({ modal });
  }

  renderDevices() {
    const { query, model } = this.state;
    const { devices } = model;
    return (
      <Menu mode="inline" defaultSelectedKeys={['localhost']}>
        {Object.keys(devices).map(deviceName => (
          <Menu.Item key={deviceName}>
            <Icon type="user" />
            <span>{deviceName}</span>
          </Menu.Item>
        ))}
      </Menu>
    );
  }

  renderRecords() {
    const { query, model, modal } = this.state;
    const { keyword } = query;
    const { records } = model;
    if (keyword) {
      records = records.filter(record => record.domain.indexOf(keyword) >= 0)
    }
    return (
      <div>
        <div className="control-box">
          <Button type="primary" icon="plus-square" onClick={e => this.showModal('new-record')}>New Record</Button>
        </div>
        <ul>
          {records.map((record, i) => (
            <li className='record-item' key={record}>
              <a onClick={e => e}>{record.domain}</a>
            </li>
          ))}
        </ul>
        <NewRecordModal visible={modal['new-record']} onSubmit={input => this.submitInput('new-record', input)} />
      </div>
    );
  }
  
  renderFields() {
    const { query, model, modal } = this.state;
    const { current } = model;
    return (
      <div>
        <div className="control-box">
          <Button type="primary" icon="plus-square" onClick={e => this.showModal('new-field')}>New Field</Button>
        </div>
        <ul>
          {current && current.fields.map((field, i) => (
            <li className='field-item' key={field.key}>
              <p>{field.key}</p>
              <p>{field.value}</p>
              <p>{field.secure}</p>
            </li>
          ))}
        </ul>
        <NewFieldModal visible={modal['new-field']} onSubmit={input => this.submitInput('new-field', input)} />
      </div>
    );
  }

  render() {
    return (
      <Layout className="layout1">
        <Layout.Sider className="sider-device" width="20rem">
          <Layout.Header className="header">
            <h1>KeyRoll</h1>
          </Layout.Header>
          {this.renderDevices()}
        </Layout.Sider>
        <Layout className="layout2">
          <Layout.Sider className="sider-record" width="30rem">
            {this.renderRecords()}
          </Layout.Sider>
          <Layout.Content className="content">
            {this.renderFields()}
          </Layout.Content>
        </Layout>
      </Layout>
    )
  }
}
