import React, { Component } from 'react';
import 'whatwg-fetch';
import { Layout, Button, Menu, Icon, Modal, Input } from 'antd';
import NewRecordModal from './component/NewRecordModal';
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
      },
      modal: {
        'new-record': false
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

  loadRecords(query) {
    let apiPath = '/__/data/loadRecords'
    return fetch(apiPath)
    .then(response => response.json())
    .then(json => {
      if (json.state) {
        const { model } = this.state;
        model.records = json.model;
        this.setState({ model });
      }
    })
  }

  saveRecord(record) {
    let apiPath = '/__/data/saveRecord';
    return fetch(apiPath, {
      method: 'POST',
      body: JSON.stringify(record.toJSONObject())
    })
    .then(response => response.json())
    .then(json => {
      if (json.state) {
      }
    });
  }

  submitInput(type, data) {
    const { modal } = this.state;
    const record = new Record(data);
    if (type === 'new-record') {
      this.saveRecord(record)
        .then(() => {
          this.loadRecords(record);
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
            <li className='file-item' key={i}>
              <a onClick={e => this.openModal('file-info', record)}>{record.domain}</a>
            </li>
          ))}
        </ul>
        <NewRecordModal visible={modal['new-record']} onSubmit={input => this.submitInput('new-record', input)} />
      </div>
    );
  }
  
  // renderContent() {
  //   const { query, model } = this.state;
  //   const { keyword } = query;
  //   const { records } = model;
  //   if (keyword) {
  //     records = records.filter(record => record.domain.indexOf(keyword) >= 0)
  //   }
  //   return (
  //     <Panel name='content' title='Content' actions={[]}>
  //       <ul>
  //         {records.map((record, i) => (
  //           <li className='file-item' key={i}>
  //             <a onClick={e => this.openModal('file-info', record)}>{record.domain}</a>
  //           </li>
  //         ))}
  //       </ul>
  //     </Panel>
  //   );
  // }

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
            main content
          </Layout.Content>
        </Layout>
      </Layout>
    )
  }
}
