import React, { Component } from 'react';
import { Layout, Button, Menu, Icon, Modal, Input } from 'antd';
import { fetchData } from './component/queryKit';
import NewRecordModal from './component/NewRecordModal';
import FieldPanel from './component/FieldPanel';
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
        currentRecord: null,
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
    return fetchData('scanDevices')
    .then(resultModel => {
      const { model } = this.state;
      model.devices = resultModel;
      this.setState({ model });
    });
  }

  loadRecord(query) {
    return fetchData('loadRecord', query)
    .then(resultModel => {
      const { model } = this.state;
      const i = model.records.findIndex(e => e.domain === query.domain);
      if (i < 0) {
        model.records.push(resultModel);
      } else {
        model.records.splice(i, 1, resultModel);
      }
      this.setState({ model });
    });
  }

  loadRecords(query) {
    return fetchData('loadRecords', query)
    .then(resultModel => {
      const { model } = this.state;
      model.records = resultModel;
      model.currentRecord = model.records[0];
      this.setState({ model });
    });
  }

  saveRecord(input) {
    return fetchData('saveRecord', {}, { record: input })
    .then(resultModel => {
    });
  }

  saveRecordField(input) {
    const { model } = this.state;
    const { currentRecord } = model;
    return fetchData('saveRecordField', { domain: currentRecord.domain }, { field: input })
    .then(resultModel => {
      this.loadRecord({ domain: currentRecord.domain });
    });
  }

  killRecordField(input) {
    const { model } = this.state;
    const { currentRecord } = model;
    return fetchData('killRecordField', { domain: currentRecord.domain }, { field: input })
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

  render() {
    const { model } = this.state;
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
            <FieldPanel model={model.currentRecord} 
              onSubmitItem={item => this.saveRecordField(model.currentRecord, item)} 
              onRemoveItem={item => this.killRecordField(model.currentRecord, item)} />
          </Layout.Content>
        </Layout>
      </Layout>
    )
  }
}
