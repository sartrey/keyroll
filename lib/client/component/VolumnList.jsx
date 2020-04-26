import React, { Component } from 'react';
import { connect, state } from '@noflux/react';
import { Drawer, Button, Input } from 'antd';
import * as actions from '../actions';
import './VolumnList.scss';

class VolumnList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: {
        device: props.device
      },
      input: {
        domain: ''
      },
      stage: ''
    };
  }

  componentDidMount() {
    const { query } = this.state;
    actions.findVolumns(query);
  }

  changeInput(name, event) {
    const { input } = this.state;
    input[name] = event.target.value;
    this.setState({ input });
  }

  submitInput() {
    const { query, input } = this.state;
    actions.editVolumn(query, input);
    this.changeStage();
  }

  changeStage(stage) {
    this.setState({ stage });
  }

  selectVolumn(value) {
    state.set('current.volumn', value);
    actions.findRecords({ domain: value.domain })
      .then(model => {
        state.set('records', model);
      });
  }

  render() {
    const { stage } = this.state;
    const volumns = state.get('volumns');
    return (
      <div className='volumn-list'>
        <div className='header'>
          <Input.Search className='search' onSearch={value => console.log(value)} />
          <Button type='primary' icon='plus' className='create' onClick={e => this.changeStage('create')} />
        </div>
        <Drawer getContainer={false} placement='bottom' height='8rem'
          visible={ stage === 'create' } closable={false} onClose={() => this.changeStage()}>
          <div className='input-volumn'>
            <h1>Volumn Info</h1>
            <Input placeholder='domain.com' onChange={e => this.changeInput('domain', e)} />
            <Button type='primary' onClick={e => this.submitInput()}>Confirm</Button>
          </div>
        </Drawer>
        <ul>
          {volumns.length > 0
            ? volumns.map((item, i) => (
              <li className='volumn-item' key={i}>
                <a onClick={e => this.selectVolumn(item)}>{item.domain}</a>
              </li>
              ))
            : (
              <li className='volumn-item' key={-1}>nothing</li>
            )
          }
        </ul>
      </div>
    );
  }
}

export default connect(VolumnList);